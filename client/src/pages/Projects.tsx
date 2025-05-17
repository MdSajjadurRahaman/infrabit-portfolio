import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';

// Types
interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to sample data
        const sampleProjects = [
          {
            _id: '1',
            title: 'Cloud Migration for FinTech',
            description: 'Migrated legacy financial systems to a secure AWS cloud infrastructure with zero downtime.',
            imageUrl: 'https://images.unsplash.com/photo-1667984550708-a6beba23cb4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
            category: 'cloud',
            featured: true,
          },
          {
            _id: '2',
            title: 'DevOps Pipeline Automation',
            description: 'Implemented CI/CD pipelines reducing deployment time from days to minutes for a software company.',
            imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['Jenkins', 'GitHub Actions', 'Docker', 'Ansible'],
            category: 'devops',
            featured: true,
          },
          {
            _id: '3',
            title: 'Hybrid Cloud Infrastructure',
            description: 'Designed and implemented a hybrid cloud solution connecting on-premises data centers with Azure cloud services.',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['Azure', 'VMware', 'ExpressRoute', 'Active Directory'],
            category: 'hybrid',
            featured: false,
          },
          {
            _id: '4',
            title: 'Security Operations Center',
            description: 'Built a comprehensive SOC with real-time threat monitoring and automated incident response.',
            imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['Splunk', 'Crowdstrike', 'PaloAlto', 'KQL'],
            category: 'security',
            featured: false,
          },
          {
            _id: '5',
            title: 'Serverless Web Application',
            description: 'Developed a high-performance web application using serverless architecture for a retail client.',
            imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3'],
            category: 'serverless',
            featured: true,
          },
          {
            _id: '6',
            title: 'Multi-Cloud Cost Optimization',
            description: 'Reduced cloud spending by 40% while improving performance through resource optimization and automation.',
            imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            technologies: ['CloudHealth', 'AWS', 'GCP', 'Terraform'],
            category: 'cloud',
            featured: false,
          },
        ];
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Get unique categories for filter
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects by category
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  return (
    <div className="bg-white w-full">
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Our Projects
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Explore our portfolio of innovative infrastructure solutions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Projects grid */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Category filter */}
        <div className="flex flex-wrap justify-center mb-12 space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-4 py-2 rounded-full capitalize mb-2 ${
                activeFilter === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link 
                to={`/projects/${project._id}`} 
                key={project._id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">No projects found for this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
