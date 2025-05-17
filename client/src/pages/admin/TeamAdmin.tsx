import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { getTeamMembers, deleteTeamMember } from '../../services/api';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  imageUrl: string;
  bio: string;
  createdAt: string;
}

const TeamAdmin = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true);
      const response = await getTeamMembers();
      setTeamMembers(response.data);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setMemberToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      setIsDeleting(true);
      await deleteTeamMember(memberToDelete);
      setTeamMembers(teamMembers.filter(member => member._id !== memberToDelete));
      setSuccessMessage('Team member deleted successfully.');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error deleting team member:', err);
      setError('Failed to delete team member. Please try again.');
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
    <AdminLayout title="Manage Team Members">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Team Members</h2>
        <Link
          to="/admin/team/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Team Member
        </Link>
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <div className="text-gray-500">Loading team members...</div>
        </div>
      ) : teamMembers.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-500">No team members found. Add your first team member.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
              {/* Image taking full width */}
              <div className="h-36 overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
                {member.imageUrl && (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Name and designation on new lines */}
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{member.position}</p>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{member.bio}</p>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Added: {new Date(member.createdAt).toLocaleDateString()}
                </span>
                <div>
                  <Link
                    to={`/admin/team/edit/${member._id}`}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                  >
                    Edit
                  </Link>
                  <button 
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                    onClick={() => handleDeleteClick(member._id)}
                  >
                    Delete
                  </button>
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
        title="Delete Team Member"
        message="Are you sure you want to delete this team member? This action cannot be undone."
        confirmButtonText={isDeleting ? "Deleting..." : "Delete"}
      />
    </AdminLayout>
  );
};

export default TeamAdmin;
