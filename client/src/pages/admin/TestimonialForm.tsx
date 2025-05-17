import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  FormInput, 
  FormTextarea, 
  FormCheckbox, 
  FormButtons,
  FormAlert,
  FormImagePreview
} from '../../components/admin/FormComponents';
import { useFormValidation, validators } from '../../hooks/useFormValidation';
import { useToast } from '../../context/ToastContext';
import api, { getTestimonialById } from '../../services/api';

interface TestimonialFormData {
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl: string;
  featured: boolean;
}

const initialFormState: TestimonialFormData = {
  name: '',
  position: '',
  company: '',
  testimonial: '',
  imageUrl: '',
  featured: false
};

const TestimonialForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Setup form validation
  const validationRules = {
    name: validators.required('Full name is required'),
    position: validators.required('Position is required'),
    company: validators.required('Company is required'),
    testimonial: validators.required('Testimonial content is required'),
    imageUrl: validators.url('Please enter a valid URL')
  };

  const {
    values: formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    setValues: setFormData,
    setFieldValue
  } = useFormValidation<TestimonialFormData>(initialFormState, validationRules);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchTestimonial = async () => {
        try {
          setIsLoading(true);
          const response = await getTestimonialById(id);
          setFormData(response.data);
        } catch (err) {
          console.error('Error fetching testimonial:', err);
          setError('Failed to load testimonial data.');
          showToast('Failed to load testimonial data', 'error');
        } finally {
          setIsLoading(false);
        }
      };

      fetchTestimonial();
    }
  }, [id, isEditMode, setFormData, showToast]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFieldValue(name as keyof TestimonialFormData, (e.target as HTMLInputElement).checked);
    } else {
      handleChange(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      showToast('Please fix the validation errors', 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      if (isEditMode && id) {
        await api.put(`/testimonials/${id}`, formData);
        setSuccessMessage('Testimonial updated successfully!');
        showToast('Testimonial updated successfully!', 'success');
      } else {
        await api.post('/testimonials', formData);
        setSuccessMessage('Testimonial created successfully!');
        showToast('Testimonial created successfully!', 'success');
        setFormData(initialFormState);
      }
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/admin/testimonials');
      }, 1500);
    } catch (err) {
      console.error('Error saving testimonial:', err);
      setError('Failed to save testimonial. Please try again.');
      showToast('Failed to save testimonial. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading testimonial data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}>
      {successMessage && <FormAlert type="success" message={successMessage} className="mb-6" />}
      {error && <FormAlert type="error" message={error} className="mb-6" />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.name}
          />
          
          <div>
            <FormInput
              id="imageUrl"
              name="imageUrl"
              label="Profile Image URL"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://example.com/profile.jpg"
              error={errors.imageUrl}
            />
            <FormImagePreview 
              src={formData.imageUrl} 
              alt="Profile preview" 
              className="w-12 h-12 rounded-full mt-2" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="position"
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="e.g., CEO, Marketing Director"
            error={errors.position}
          />
          
          <FormInput
            id="company"
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="e.g., Acme Inc."
            error={errors.company}
          />
        </div>
        
        <FormTextarea
          id="content"
          name="content"
          label="Testimonial Content"
          value={formData.testimonial}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={5}
          placeholder="The testimonial text..."
          error={errors.testimonial}
        />
        
        <FormCheckbox
          id="featured"
          name="featured"
          label="Featured Testimonial"
          checked={formData.featured}
          onChange={handleCustomChange}
        />
        
        <FormButtons
          onCancel={() => navigate('/admin/testimonials')}
          isSubmitting={isLoading}
          isEditMode={isEditMode}
          submitText={isLoading ? 'Saving...' : isEditMode ? 'Update Testimonial' : 'Create Testimonial'}
          className="pt-4"
        />
      </form>
    </AdminLayout>
  );
};

export default TestimonialForm;
