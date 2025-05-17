import { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import axios from 'axios';
import { getServices, getFeaturedProjects, getFeaturedTestimonials } from '../services/api';

// Types
interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  featured: boolean;
}

interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  imageUrl: string;
  rating: number;
  featured: boolean;
}

const Home = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState({
    services: true,
    projects: true,
    testimonials: true,
  });

  useEffect(() => {
    // Fetch services, featured projects, and testimonials from API
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await getServices();
        setServices(servicesResponse.data);
        setLoading((prev) => ({ ...prev, services: false }));
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to sample data if API fails
        setServices([
          {
            _id: '1',
            title: 'Cloud Infrastructure',
            description: 'Robust, scalable cloud solutions tailored to your business needs',
            icon: 'cloud',
            features: ['AWS/Azure/GCP', 'Hybrid Cloud', 'Cloud Migration', 'Cost Optimization'],
          },
          {
            _id: '2',
            title: 'DevOps Automation',
            description: 'Streamline your development workflow with CI/CD and automation',
            icon: 'code',
            features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Containerization', 'Monitoring'],
          },
          {
            _id: '3',
            title: 'Security Solutions',
            description: 'Protect your digital assets with enterprise-grade security',
            icon: 'shield',
            features: ['Vulnerability Assessment', 'Compliance', 'Identity Management', 'Encryption'],
          },
        ]);
        setLoading((prev) => ({ ...prev, services: false }));
      }
      
      try {
        // Fetch featured projects
        const projectsResponse = await getFeaturedProjects();
        setFeaturedProjects(projectsResponse.data);
        setLoading((prev) => ({ ...prev, projects: false }));
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        // Keep existing mock projects as fallback
        setLoading((prev) => ({ ...prev, projects: false }));
      }
      
      try {
        // Fetch testimonials
        const testimonialsResponse = await getFeaturedTestimonials();
        setTestimonials(testimonialsResponse.data);
        setLoading((prev) => ({ ...prev, testimonials: false }));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Keep existing mock testimonials as fallback
        setLoading((prev) => ({ ...prev, testimonials: false }));
      }
    };
    
    fetchData();
  }, []);

  // Icon mapping for services
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div>
      <Hero />
      
      {/* Services Section */}
      <section className="py-20 bg-white w-full">
        <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Infrastructure Solutions for Modern Business
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              We provide comprehensive infrastructure services to help your business thrive in the digital age.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading.services ? (
              <div className="col-span-3 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-4">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-500 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              View All Services
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Case Studies</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Featured Projects
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Explore some of our most impactful work with industry-leading clients.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading.projects ? (
              <div className="col-span-3 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              featuredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white overflow-hidden shadow-lg rounded-lg flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9 relative h-48">
                    <img
                      className="w-full h-full object-cover"
                      src={project.imageUrl}
                      alt={project.title}
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-500 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/projects/${project._id}`}
                      className="text-primary-600 hover:text-primary-500 font-medium flex items-center"
                    >
                      View Case Study
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-12 text-center">
            <a
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What Our Clients Say
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {loading.testimonials ? (
              <div className="col-span-3 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-gray-50 p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-500">{testimonial.position}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.testimonial}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your infrastructure?</span>
            <span className="block text-primary-200">Get started with InfraBit today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Get Started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/services"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
