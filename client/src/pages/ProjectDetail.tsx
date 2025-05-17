import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../services/api';

// Types
interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  featured: boolean;
  client?: string;
  duration?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  gallery?: string[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      try {
        const response = await getProjectById(id);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Failed to load project details');
        setLoading(false);

        // Fallback to mock data for sample project if real API fails
        if (id === '1') {
          setProject({
            _id: '1',
            title: 'Cloud Migration for FinTech',
            description: 'Migrated legacy financial systems to a secure AWS cloud infrastructure with zero downtime.',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afddc27a96ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
            category: 'cloud',
            featured: true,
            client: 'Global FinTech Solutions',
            duration: '6 months',
            challenge: 'The client needed to migrate their legacy on-premise financial systems to the cloud without disrupting their 24/7 operations. The systems were handling billions in transactions daily and any downtime would result in significant financial loss.',
            solution: 'We designed a phased migration approach using AWS services including EC2, RDS, and S3, coupled with Terraform for infrastructure as code. We implemented a blue-green deployment strategy to ensure zero downtime during the transition, with comprehensive testing at each stage.',
            results: 'Successfully migrated all systems with zero downtime. Achieved 40% reduction in infrastructure costs and 60% improvement in system performance. Enhanced security posture with AWS security services and implemented automated disaster recovery capabilities.',
            gallery: [
              'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            ],
          });
          setError('');
        }
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Project Not Found</h2>
          <p className="mt-4 text-lg text-gray-600">{error || 'The requested project could not be found.'}</p>
          <Link
            to="/projects"
            className="mt-8 inline-block bg-primary-600 px-6 py-3 rounded-md text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div 
        className="h-80 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-extrabold sm:text-5xl">{project.title}</h1>
          {project.client && (
            <p className="mt-2 text-xl">Client: {project.client}</p>
          )}
        </div>
      </div>
      
      {/* Project details */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-lg text-gray-700">{project.description}</p>
            
            {project.challenge && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Challenge</h3>
                <p className="text-gray-700">{project.challenge}</p>
              </div>
            )}
            
            {project.solution && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Solution</h3>
                <p className="text-gray-700">{project.solution}</p>
              </div>
            )}
            
            {project.results && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Results</h3>
                <p className="text-gray-700">{project.results}</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium text-gray-900 capitalize">{project.category}</p>
              </div>
              
              {project.duration && (
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{project.duration}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">Technologies</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Project gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={image} 
                    alt={`${project.title} gallery image ${index + 1}`} 
                    className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to projects button */}
        <div className="mt-16 text-center">
          <Link 
            to="/projects" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
