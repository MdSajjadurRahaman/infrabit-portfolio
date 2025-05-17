import { useState, useEffect } from 'react';
import { getServices } from '../services/api';

// Types
interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  longDescription?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback to sample data
        setServices([
          {
            _id: '1',
            title: 'Cloud Infrastructure',
            description: 'Robust, scalable cloud solutions tailored to your business needs',
            icon: 'cloud',
            features: ['AWS/Azure/GCP', 'Hybrid Cloud', 'Cloud Migration', 'Cost Optimization'],
            longDescription: 'Our cloud infrastructure services provide comprehensive solutions for businesses looking to leverage cloud technology. We design, implement, and manage cloud environments that are secure, scalable, and cost-effective. Whether you need to migrate existing systems to the cloud, build new cloud-native applications, or optimize your current cloud infrastructure, our experts will guide you through the process.',
          },
          {
            _id: '2',
            title: 'DevOps Automation',
            description: 'Streamline your development workflow with CI/CD and automation',
            icon: 'code',
            features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Containerization', 'Monitoring'],
            longDescription: 'Our DevOps automation services help organizations streamline their development workflows and accelerate software delivery. We implement continuous integration and continuous deployment (CI/CD) pipelines, containerize applications, and automate infrastructure provisioning. By adopting DevOps practices, our clients achieve faster time-to-market, improved collaboration between teams, and higher quality software releases.',
          },
          {
            _id: '3',
            title: 'Security Solutions',
            description: 'Protect your digital assets with enterprise-grade security',
            icon: 'shield',
            features: ['Vulnerability Assessment', 'Compliance', 'Identity Management', 'Encryption'],
            longDescription: 'Our security solutions provide comprehensive protection for your digital assets. We conduct thorough vulnerability assessments, implement compliance controls, manage identity and access, and employ encryption strategies. Our approach ensures that security is integrated into every aspect of your infrastructure, protecting your data and systems from evolving threats.',
          },
          {
            _id: '4',
            title: 'Managed IT Services',
            description: '24/7 support and maintenance for your infrastructure',
            icon: 'support',
            features: ['System Monitoring', 'Incident Response', 'Patch Management', 'Help Desk'],
            longDescription: 'Our managed IT services provide round-the-clock monitoring and support for your infrastructure. We proactively identify and address issues before they impact your business, handle system updates and patch management, and provide responsive help desk support. With our team managing your IT, you can focus on your core business while enjoying reliable, high-performing systems.',
          },
        ]);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Icon mapping for services
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'cloud':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'support':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white w-full">
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Our Services
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Comprehensive infrastructure solutions to power your business
            </p>
          </div>
        </div>
      </div>
      
      {/* Services section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service._id} 
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="mb-4">
                    {getIcon(service.icon)}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    {service.longDescription || service.description}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`bg-gray-100 h-96 rounded-lg shadow-inner flex items-center justify-center ${
                  index % 2 === 1 ? 'md:col-start-1' : 'md:col-start-2'
                }`}>
                  <div className="text-center p-8">
                    <div className="mx-auto">
                      {getIcon(service.icon)}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* CTA section */}
        <div className="mt-24 bg-primary-700 rounded-lg shadow-xl">
          <div className="px-6 py-12 md:px-12 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Ready to transform your infrastructure?
              </h2>
              <p className="mt-3 text-lg text-primary-200">
                Contact us today to discuss your specific needs and how we can help.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-primary-50"
              >
                Contact Us
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
