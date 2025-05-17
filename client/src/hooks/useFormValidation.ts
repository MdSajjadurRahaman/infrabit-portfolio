import { useState, useCallback } from 'react';

type ValidationFunction<T> = (value: T) => string | undefined;

// Enhanced validator type with chaining capability
export class ChainableValidator<T> {
  private validator: ValidationFunction<T>;

  constructor(validator: ValidationFunction<T>) {
    this.validator = validator;
  }

  and(nextValidator: ChainableValidator<T> | ValidationFunction<T>): ChainableValidator<T> {
    const currentValidator = this.validator;
    const nextValidatorFn = nextValidator instanceof ChainableValidator 
      ? nextValidator.validate.bind(nextValidator)
      : nextValidator;
      
    this.validator = (value: T) => {
      const result = currentValidator(value);
      if (result) return result;
      return nextValidatorFn(value);
    };
    return this;
  }

  or(nextValidator: ChainableValidator<T> | ValidationFunction<T>): ChainableValidator<T> {
    const currentValidator = this.validator;
    const nextValidatorFn = nextValidator instanceof ChainableValidator 
      ? nextValidator.validate.bind(nextValidator)
      : nextValidator;
      
    this.validator = (value: T) => {
      const result = currentValidator(value);
      if (!result) return undefined;
      return nextValidatorFn(value);
    };
    return this;
  }

  validate(value: T): string | undefined {
    return this.validator(value);
  }
}

// Type for validators in the validator map
type ValidatorType<T> = ValidationFunction<T> | ChainableValidator<T>;
type ValidatorMap<T> = { [K in keyof T]?: ValidatorType<T[K]> };
type ErrorMap<T> = { [K in keyof T]?: string };

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validators: ValidatorMap<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorMap<T>>({});
  const [touched, setTouched] = useState<{ [K in keyof T]?: boolean }>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;
      const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      
      setValues((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      // Validate field on change if it's already been touched
      if (touched[name as keyof T]) {
        validateField(name as keyof T, newValue);
      }
    },
    [touched]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      
      // Mark field as touched
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validate field
      validateField(name as keyof T, value);
    },
    []
  );

  const validateField = useCallback(
    (name: keyof T, value: any) => {
      const validator = validators[name];
      let error: string | undefined;
      
      if (validator) {
        // Handle our chainable validator class
        if (validator instanceof ChainableValidator) {
          error = validator.validate(value);
        } else {
          // Handle regular validator functions
          error = validator(value);
        }
      }

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));

      return !error;
    },
    [validators]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors: ErrorMap<T> = {};
    const newTouched: { [K in keyof T]?: boolean } = {};

    // Validate all fields
    for (const key in validators) {
      const typedKey = key as keyof T;
      newTouched[typedKey] = true;
      
      const validator = validators[typedKey];
      if (validator) {
        let error: string | undefined;
        
        // Handle our chainable validator class
        if (validator instanceof ChainableValidator) {
          error = validator.validate(values[typedKey]);
        } else {
          // Handle regular validator functions
          error = validator(values[typedKey]);
        }
        
        if (error) {
          newErrors[typedKey] = error;
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    setTouched(newTouched);
    return isValid;
  }, [values, validators]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const setFieldError = useCallback((name: keyof T, error: string | undefined) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    setFieldError,
    setValues,
  };
}

// Common validators that return ChainableValidator instances
export const validators = {
  required: (message = 'This field is required') => {
    const validator = (value: any) => {
      if (value === undefined || value === null || value === '') {
        return message;
      }
      if (Array.isArray(value) && value.length === 0) {
        return message;
      }
      return undefined;
    };
    return new ChainableValidator(validator);
  },
  
  email: (message = 'Please enter a valid email address') => {
    const validator = (value: string) => {
      if (!value) return undefined; // Empty values are handled by required validator
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? undefined : message;
    };
    return new ChainableValidator(validator);
  },
  
  minLength: (length: number, message?: string) => {
    const validator = (value: string) => {
      if (!value) return undefined; // Empty values are handled by required validator
      
      return value.length >= length
        ? undefined
        : message || `Must be at least ${length} characters`;
    };
    return new ChainableValidator(validator);
  },
  
  url: (message = 'Please enter a valid URL') => {
    const validator = (value: string) => {
      if (!value) return undefined; // Empty values are handled by required validator
      
      try {
        new URL(value);
        return undefined;
      } catch (e) {
        return message;
      }
    };
    return new ChainableValidator(validator);
  },
  
  phoneNumber: (message = 'Please enter a valid phone number') => {
    const validator = (value: string) => {
      if (!value) return undefined; // Empty values are handled by required validator
      
      const phoneRegex = /^\+?[0-9]{8,15}$/;
      return phoneRegex.test(value.replace(/[\s-]/g, '')) ? undefined : message;
    };
    return new ChainableValidator(validator);
  }
};
