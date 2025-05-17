import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { FormInput, FormTextarea, FormButtons, FormAlert } from '../../components/admin/FormComponents';
import { useFormValidation, validators } from '../../hooks/useFormValidation';
import { useToast } from '../../context/ToastContext';
import api, { getTeamMemberById } from '../../services/api';

interface TeamMemberFormData {
  name: string;
  position: string;
  imageUrl: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const initialFormState: TeamMemberFormData = {
  name: '',
  position: '',
  imageUrl: '',
  bio: '',
  socialLinks: {
    linkedin: '',
    twitter: '',
    github: ''
  }
};

const TeamMemberForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const isEditMode = Boolean(id);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
  } = useFormValidation<TeamMemberFormData>(initialFormState, {
    name: validators.required('Name is required'),
    position: validators.required('Position is required'),
    imageUrl: validators.required('Image URL is required').and(validators.url('Please enter a valid URL')),
    bio: validators.required('Bio is required').and(validators.minLength(20, 'Bio should be at least 20 characters')),
  });

  // Handle social link changes
  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const socialNetwork = name.replace('social_', '');
    
    setFieldValue('socialLinks', {
      ...formData.socialLinks,
      [socialNetwork]: value
    });
  };

  useEffect(() => {
    if (isEditMode && id) {
      const fetchTeamMember = async () => {
        try {
          setIsLoading(true);
          const response = await getTeamMemberById(id);
          setValues(response.data);
        } catch (err) {
          console.error('Error fetching team member:', err);
          setError('Failed to load team member data.');
          showToast('Failed to load team member data.', 'error');
        } finally {
          setIsLoading(false);
        }
      };

      fetchTeamMember();
    }
  }, [id, isEditMode, setValues, showToast]);

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
        await api.put(`/team/${id}`, formData);
        showToast('Team member updated successfully!', 'success');
        setSuccessMessage('Team member updated successfully!');
      } else {
        await api.post('/team', formData);
        showToast('Team member created successfully!', 'success');
        setSuccessMessage('Team member created successfully!');
      }
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/admin/team');
      }, 1500);
    } catch (err) {
      console.error('Error saving team member:', err);
      setError('Failed to save team member. Please try again.');
      showToast('Failed to save team member.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <AdminLayout title={isEditMode ? 'Edit Team Member' : 'Add Team Member'}>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading team member data...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={isEditMode ? 'Edit Team Member' : 'Add Team Member'}>
      {successMessage && (
        <FormAlert type="success" message={successMessage} className="mb-6" />
      )}
      
      {error && (
        <FormAlert type="error" message={error} className="mb-6" />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            required
          />
          
          <FormInput
            id="position"
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.position}
            placeholder="e.g., CEO, Developer, Designer"
            required
          />
        </div>
        
        <FormInput
          id="imageUrl"
          name="imageUrl"
          label="Profile Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.imageUrl}
          type="url"
          placeholder="https://example.com/profile.jpg"
          required
        />
        
        {formData.imageUrl && (
          <div className="mt-2">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-24 h-24 object-cover rounded-full border"
            />
          </div>
        )}
        
        <FormTextarea
          id="bio"
          name="bio"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.bio}
          rows={5}
          placeholder="A brief biography of the team member"
          required
        />
        
        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="text-sm font-medium text-gray-700 px-2">Social Links (Optional)</legend>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              id="social_linkedin"
              name="social_linkedin"
              label="LinkedIn"
              value={formData.socialLinks.linkedin || ''}
              onChange={handleSocialChange}
              type="url"
              placeholder="https://linkedin.com/in/username"
            />
            
            <FormInput
              id="social_twitter"
              name="social_twitter"
              label="Twitter"
              value={formData.socialLinks.twitter || ''}
              onChange={handleSocialChange}
              type="url"
              placeholder="https://twitter.com/username"
            />
            
            <FormInput
              id="social_github"
              name="social_github"
              label="GitHub"
              value={formData.socialLinks.github || ''}
              onChange={handleSocialChange}
              type="url"
              placeholder="https://github.com/username"
            />
          </div>
        </fieldset>
        
        <FormButtons
          onCancel={() => navigate('/admin/team')}
          isSubmitting={isLoading}
          isEditMode={isEditMode}
          cancelText="Cancel"
          submitText={isEditMode ? 'Update Team Member' : 'Add Team Member'}
        />
      </form>
    </AdminLayout>
  );
};

export default TeamMemberForm;
