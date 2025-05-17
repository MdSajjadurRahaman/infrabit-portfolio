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
import api, { getProjectById } from '../../services/api';

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  featured: boolean;
  client: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string;
  gallery: string[];
}

const initialFormState: ProjectFormData = {
  title: '',
  description: '',
  imageUrl: '',
  technologies: [],
  category: '',
  featured: false,
  client: '',
  duration: '',
  challenge: '',
  solution: '',
  results: '',
  gallery: []
};

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [techInput, setTechInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Setup form validation
  const validationRules = {
    title: validators.required('Project title is required'),
    description: validators.required('Description is required'),
    imageUrl: validators.required('Main image URL is required').and(validators.url('Please enter a valid URL')),
    category: validators.required('Category is required')
  };

  const {
    values: formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    setValues: setFormData,
    setFieldValue
  } = useFormValidation<ProjectFormData>(initialFormState, validationRules);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProject = async () => {
        try {
          setIsLoading(true);
          const response = await getProjectById(id);
          setFormData(response.data);
        } catch (err) {
          console.error('Error fetching project:', err);
          setError('Failed to load project data.');
          showToast('Failed to load project data', 'error');
        } finally {
          setIsLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, isEditMode, setFormData, showToast]);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFieldValue(name as keyof ProjectFormData, (e.target as HTMLInputElement).checked);
    } else {
      handleChange(e);
    }
  };

  const handleTechAdd = () => {
    if (techInput.trim()) {
      setFieldValue('technologies', [...formData.technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleTechRemove = (index: number) => {
    setFieldValue('technologies', formData.technologies.filter((_, i) => i !== index));
  };

  const handleGalleryAdd = () => {
    if (galleryInput.trim()) {
      // Validate URL
      try {
        new URL(galleryInput);
        setFieldValue('gallery', [...formData.gallery, galleryInput.trim()]);
        setGalleryInput('');
      } catch (e) {
        showToast('Please enter a valid image URL', 'error');
      }
    }
  };

  const handleGalleryRemove = (index: number) => {
    setFieldValue('gallery', formData.gallery.filter((_, i) => i !== index));
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
        await api.put(`/projects/${id}`, formData);
        setSuccessMessage('Project updated successfully!');
        showToast('Project updated successfully!', 'success');
      } else {
        await api.post('/projects', formData);
        setSuccessMessage('Project created successfully!');
        showToast('Project created successfully!', 'success');
        setFormData(initialFormState);
      }
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/admin/projects');
      }, 1500);
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
      showToast('Failed to save project. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Project' : 'Add New Project'}>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading project data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Project' : 'Add New Project'}>
      {successMessage && <FormAlert type="success" message={successMessage} className="mb-6" />}
      {error && <FormAlert type="error" message={error} className="mb-6" />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="title"
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors.title}
          />
          
          <FormInput
            id="category"
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="e.g., Web Development, Mobile App"
            error={errors.category}
          />
          
          <FormInput
            id="client"
            name="client"
            label="Client"
            value={formData.client}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          
          <FormInput
            id="duration"
            name="duration"
            label="Duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 months"
          />
        </div>
        
        <FormTextarea
          id="description"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          rows={4}
          error={errors.description}
        />
        
        <div>
          <FormInput
            id="imageUrl"
            name="imageUrl"
            label="Main Image URL"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="https://example.com/image.jpg"
            error={errors.imageUrl}
          />
          <FormImagePreview 
            src={formData.imageUrl} 
            alt="Project preview" 
            className="w-40 h-auto mt-2" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Technologies
          </label>
          <div className="flex max-w-full">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-200 shadow-sm"
              placeholder="Add a technology and press Add"
            />
            <button
              type="button"
              onClick={handleTechAdd}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 shadow-sm"
            >
              Add
            </button>
          </div>
          {formData.technologies.length > 0 && (
            <div className="mt-2 flex gap-2">
              {formData.technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex h-7 items-center bg-gray-100 dark:bg-gray-700 px-3 rounded-full text-sm dark:text-gray-200 border border-transparent dark:border-gray-600 w-auto max-w-fit"
                style={{ width: 'auto' }}
              >
                <span className="leading-none whitespace-nowrap">{tech}</span>
                <button
                  type="button"
                  onClick={() => handleTechRemove(index)}
                  className="inline-flex items-center p-0 justify-center m-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none leading-none"
                  style={{ width: 'auto' }}
                  aria-label="Remove technology"
                >×</button>
              </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormTextarea
            id="challenge"
            name="challenge"
            label="Challenge"
            value={formData.challenge}
            onChange={handleChange}
            rows={3}
          />
          
          <FormTextarea
            id="solution"
            name="solution"
            label="Solution"
            value={formData.solution}
            onChange={handleChange}
            rows={3}
          />
        </div>
        
        <FormTextarea
          id="results"
          name="results"
          label="Results"
          value={formData.results}
          onChange={handleChange}
          rows={3}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Gallery Images
          </label>
          <div className="flex max-w-full">
            <input
              type="url"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-200 shadow-sm"
              placeholder="https://example.com/gallery-image.jpg"
            />
            <button
              type="button"
              onClick={handleGalleryAdd}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 shadow-sm"
            >
              Add
            </button>
          </div>
          {formData.gallery.length > 0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.gallery.map((img, index) => (
                <div key={index} className="relative">
                  <img 
                    src={img} 
                    alt={`Gallery ${index}`} 
                    className="w-full h-24 object-cover border dark:border-gray-600 rounded shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleGalleryRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 dark:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm focus:outline-none transition-colors"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <FormCheckbox
          id="featured"
          name="featured"
          label="Featured Project"
          checked={formData.featured}
          onChange={handleCustomChange}
        />
        
        <FormButtons
          onCancel={() => navigate('/admin/projects')}
          isSubmitting={isLoading}
          isEditMode={isEditMode}
          submitText={isLoading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
          className="pt-4"
        />
      </form>
    </AdminLayout>
  );
};

export default ProjectForm;
