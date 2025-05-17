import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-600 mix-blend-multiply opacity-80" />
      </div>
      
      <div className="relative container mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Building Digital</span>
            <span className="block text-primary-200">Infrastructure Excellence</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200 sm:max-w-3xl">
            Empowering businesses with cutting-edge infrastructure solutions that drive innovation, 
            efficiency, and sustainable growth in today's digital landscape.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link 
                to="/services"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Our Services
              </Link>
              <Link
                to="/contact"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 200" 
          xmlns="http://www.w3.org/2000/svg" 
          className="fill-white w-full h-auto"
        >
          <path 
            d="M0,96L60,106.7C120,117,240,139,360,138.7C480,139,600,117,720,112C840,107,960,117,1080,112C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
