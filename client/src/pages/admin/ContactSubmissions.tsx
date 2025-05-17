import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import api from '../../services/api';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/contact');
        setSubmissions(response.data);
      } catch (err) {
        console.error('Error fetching contact submissions:', err);
        setError('Failed to load contact submissions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <AdminLayout title="Contact Submissions">
      <div className="mb-6">
        <h2 className="text-xl font-medium dark:text-gray-100">Contact Form Submissions</h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
          View messages from potential clients and contacts
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-sm font-medium dark:text-gray-100">Messages</h3>
          </div>
          
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-300">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-300">No contact submissions found.</div>
          ) : (
            <div className="divide-y dark:divide-gray-700 max-h-[600px] overflow-y-auto dark:bg-gray-800">
              {submissions.map((submission) => (
                <button
                  key={submission._id}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 ${selectedSubmission?._id === submission._id ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{submission.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{submission.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{submission.message.substring(0, 60)}...</p>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="col-span-1 lg:col-span-2 border dark:border-gray-700 rounded-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700">
            <h3 className="text-sm font-medium dark:text-gray-100">Message Details</h3>
          </div>
          
          {selectedSubmission ? (
            <div className="p-4">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">{selectedSubmission.name}</h2>
                <div className="mt-2 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium dark:text-gray-200">Email:</span>{' '}
                    <a href={`mailto:${selectedSubmission.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      {selectedSubmission.email}
                    </a>
                  </p>
                  {selectedSubmission.phone && (
                    <p className="text-sm">
                      <span className="font-medium dark:text-gray-200">Phone:</span>{' '}
                      <a href={`tel:${selectedSubmission.phone}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {selectedSubmission.phone}
                      </a>
                    </p>
                  )}
                  {selectedSubmission.company && (
                    <p className="text-sm dark:text-gray-300">
                      <span className="font-medium dark:text-gray-200">Company:</span> {selectedSubmission.company}
                    </p>
                  )}
                  <p className="text-sm dark:text-gray-300">
                    <span className="font-medium dark:text-gray-200">Submitted on:</span>{' '}
                    {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2 dark:text-gray-100">Message</h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md whitespace-pre-wrap text-sm dark:text-gray-300">
                  {selectedSubmission.message}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <a
                  href={`mailto:${selectedSubmission.email}?subject=Re: Your inquiry to InfraBit`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-300">
              Select a message from the list to view details
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContactSubmissions;
