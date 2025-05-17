import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { FormAlert } from '../../components/admin/FormComponents';
import { useToast } from '../../context/ToastContext';
import { getTestimonials, deleteTestimonial } from '../../services/api';

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
}

const TestimonialsAdmin = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const response = await getTestimonials();
      setTestimonials(response.data);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials. Please try again.');
      showToast('Failed to load testimonials. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setTestimonialToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      setIsDeleting(true);
      await deleteTestimonial(testimonialToDelete);
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialToDelete));
      setSuccessMessage('Testimonial deleted successfully.');
      showToast('Testimonial deleted successfully.', 'success');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      setError('Failed to delete testimonial. Please try again.');
      showToast('Failed to delete testimonial. Please try again.', 'error');
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setTestimonialToDelete(null);
    }
  };

  return (
    <AdminLayout title="Manage Testimonials">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">All Testimonials</h2>
        <Link
          to="/admin/testimonials/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add New Testimonial
        </Link>
      </div>

      {successMessage && <FormAlert type="success" message={successMessage} className="mb-4" />}
      {error && <FormAlert type="error" message={error} className="mb-4" />}

      {isLoading ? (
        <div className="text-center py-10">
          <div className="text-gray-500">Loading testimonials...</div>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-500">No testimonials found. Add your first testimonial.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Image section at top */}
              <div className="h-36 overflow-hidden bg-gray-200">
                {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Content section */}
              <div className="p-6 relative">
                {/* Featured badge */}
                {testimonial.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                )}
                
                {/* Testimonial content */}
                <div className="my-4">
                  <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
                </div>
                
                {/* Footer with date and actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                  </span>
                  <div>
                    <Link
                      to={`/admin/testimonials/edit/${testimonial._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteClick(testimonial._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmButtonText={isDeleting ? "Deleting..." : "Delete"}
      />
    </AdminLayout>
  );
};

export default TestimonialsAdmin;
