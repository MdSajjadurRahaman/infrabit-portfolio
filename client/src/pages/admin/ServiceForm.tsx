import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { FormInput, FormTextarea, FormSelect, FormButtons, FormAlert } from '../../components/admin/FormComponents';
import { useFormValidation, validators } from '../../hooks/useFormValidation';
import { useToast } from '../../context/ToastContext';
import api, { getServiceById } from '../../services/api';

interface ServiceFormData {
  title: string;
  description: string;
  icon: string;
  features: string[];
  longDescription: string;
}

const initialFormState: ServiceFormData = {
  title: '',
  description: '',
  icon: '',
  features: [],
  longDescription: ''
};

const iconOptions = [
  'cloud', 'server', 'database', 'code', 'shield', 'mobile',
  'laptop', 'desktop', 'network', 'globe', 'cog', 'chart-line'
];

const ServiceForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form validation setup
  const {
    values: formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    setValues,
    setFieldValue
  } = useFormValidation<ServiceFormData>(initialFormState, {
    title: validators.required('Title is required'),
    description: validators.required('Short description is required').and(validators.minLength(10, 'Description should be at least 10 characters')),
    icon: validators.required('Please select an icon'),
    longDescription: validators.required('Full description is required').and(validators.minLength(30, 'Full description should be at least 30 characters')),
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchService = async () => {
        try {
          setIsLoading(true);
          const response = await getServiceById(id);
          setValues(response.data);
        } catch (err) {
          console.error('Error fetching service:', err);
          setError('Failed to load service data.');
          showToast('Failed to load service data.', 'error');
        } finally {
          setIsLoading(false);
        }
      };

      fetchService();
    }
  }, [id, isEditMode, setValues, showToast]);

  const handleFeatureAdd = () => {
    if (featureInput.trim()) {
      setFieldValue('features', [...formData.features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (index: number) => {
    setFieldValue('features', formData.features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      showToast('Please fix the validation errors.', 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      if (isEditMode && id) {
        await api.put(`/services/${id}`, formData);
        showToast('Service updated successfully!', 'success');
        setSuccessMessage('Service updated successfully!');
      } else {
        await api.post('/services', formData);
        showToast('Service created successfully!', 'success');
        setSuccessMessage('Service created successfully!');
      }
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/admin/services');
      }, 1500);
    } catch (err) {
      console.error('Error saving service:', err);
      setError('Failed to save service. Please try again.');
      showToast('Failed to save service.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Service' : 'Add New Service'}>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading service data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Service' : 'Add New Service'}>
      {successMessage && (
        <FormAlert type="success" message={successMessage} className="mb-6" />
      )}
      
      {error && (
        <FormAlert type="error" message={error} className="mb-6" />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.title}
            required
          />
          
          <FormSelect
            id="icon"
            name="icon"
            label="Icon"
            value={formData.icon}
            onChange={handleChange}
            onBlur={handleBlur}
            options={iconOptions.map(icon => ({ value: icon, label: icon }))}
            error={errors.icon}
            required
          />
        </div>
        
        {formData.icon && (
          <div className="mt-2 flex items-center">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2">
              <i className={formData.icon}></i>
            </div>
            <span className="text-sm text-gray-500">Selected icon: {formData.icon}</span>
          </div>
        )}
        
        <FormTextarea
          id="description"
          name="description"
          label="Short Description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.description}
          rows={2}
          placeholder="A brief description of the service"
          required
        />
        
        <FormTextarea
          id="longDescription"
          name="longDescription"
          label="Full Description"
          value={formData.longDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.longDescription}
          rows={5}
          placeholder="A detailed description of the service"
          required
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features
          </label>
          <div className="flex">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add a feature and press Add"
            />
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300"
            >
              Add
            </button>
          </div>
          {formData.features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center text-sm"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleFeatureRemove(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <FormButtons
          onCancel={() => navigate('/admin/services')}
          isSubmitting={isLoading}
          isEditMode={isEditMode}
          cancelText="Cancel"
          submitText={isEditMode ? 'Update Service' : 'Create Service'}
        />
      </form>
    </AdminLayout>
  );
};

export default ServiceForm;
