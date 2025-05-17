import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder = '',
  required = false,
  className = '',
  error
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } rounded-md shadow-sm focus:outline-none focus:ring-1 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  rows = 3,
  placeholder = '',
  required = false,
  className = '',
  error
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } rounded-md shadow-sm focus:outline-none focus:ring-1 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
      />
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

interface FormCheckboxProps {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  className?: string;
  error?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  required = false,
  className = '',
  error
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label} {required && <span className="text-red-500 dark:text-red-400">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
        } rounded-md shadow-sm focus:outline-none focus:ring-1 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="dark:bg-gray-800">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

interface FormButtonsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  cancelText?: string;
  submitText?: string;
  className?: string;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  onCancel,
  isSubmitting,
  isEditMode = false,
  cancelText = 'Cancel',
  submitText,
  className = ''
}) => {
  const defaultSubmitText = isSubmitting 
    ? 'Saving...' 
    : isEditMode 
      ? 'Update' 
      : 'Create';
  
  return (
    <div className={`flex space-x-4 ${className}`}>
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        {submitText || defaultSubmitText}
      </button>
    </div>
  );
};

export const FormImagePreview: React.FC<{ src: string; alt: string; className?: string }> = ({
  src,
  alt,
  className = ''
}) => {
  if (!src) return null;
  
  return (
    <div className="mt-2">
      <img 
        src={src} 
        alt={alt} 
        className={`border rounded object-cover ${className}`}
      />
    </div>
  );
};

interface FormAlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  className?: string;
}

export const FormAlert: React.FC<FormAlertProps> = ({ type, message, className = '' }) => {
  if (!message) return null;
  
  const alertStyles = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <div className={`p-4 rounded-md ${alertStyles[type]} ${className}`}>
      {message}
    </div>
  );
};
