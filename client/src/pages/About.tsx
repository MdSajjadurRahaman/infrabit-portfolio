const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-primary-800 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-600 mix-blend-multiply opacity-80" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              About InfraBit
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-300 sm:max-w-3xl">
              Building the digital infrastructure that powers tomorrow's innovations
            </p>
          </div>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Mission</p>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Powering Digital Transformation
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              InfraBit is dedicated to providing robust, scalable, and secure infrastructure solutions
              that enable businesses to thrive in the digital age.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Vision</h3>
                  <p className="mt-2 text-base text-gray-500">
                    To be the global leader in innovative infrastructure solutions, transforming how
                    businesses operate in the digital world while prioritizing security, reliability, and efficiency.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-center h-12 w-12 rounded-md text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Our Values</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Excellence, innovation, integrity, and customer-centricity are the core values
                    that guide our approach to every project and partnership we undertake.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <p className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Story</p>
            <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              From Startup to Industry Leader
            </h2>
          </div>

          <div className="prose prose-lg text-gray-500 mx-auto">
            <p>
              Founded in 2015, InfraBit began as a small team of passionate engineers with a vision
              to revolutionize how businesses approach their digital infrastructure. What started as
              a specialized cloud consulting firm quickly evolved into a comprehensive infrastructure
              solutions provider as we identified critical gaps in the market.
            </p>
            <p>
              Over the years, we've grown our expertise across cloud infrastructure, DevOps automation,
              security architecture, and managed services. Our team has expanded from 5 to over 120
              specialists across three continents, serving clients ranging from ambitious startups to
              Fortune 500 enterprises.
            </p>
            <p>
              Today, InfraBit stands as an industry leader in infrastructure innovation, having helped
              hundreds of organizations modernize their technology stack, enhance their security posture,
              and achieve unprecedented operational efficiency. Our commitment to excellence and customer
              success remains at the core of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by businesses worldwide
            </h2>
            <p className="mt-3 text-xl text-primary-200">
              Our growing impact in numbers
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">
                Successful Projects
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">500+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">
                Global Clients
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">150+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-primary-200">
                Expert Team Members
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">120+</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            <div className="space-y-5">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Meet Our Leadership Team</h2>
              <p className="text-xl text-gray-500">
                The experienced professionals guiding our company's strategic vision and growth
              </p>
            </div>
            <ul className="space-y-12 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
              {[
                {
                  name: 'Alex Rodriguez',
                  role: 'Founder & CEO',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  bio: 'Former CTO at CloudFlex with 20+ years of infrastructure expertise.',
                },
                {
                  name: 'Sarah Chen',
                  role: 'CTO',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  bio: 'Cloud architecture pioneer with leadership experience at major tech companies.',
                },
                {
                  name: 'Michael Johnson',
                  role: 'COO',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                  bio: 'Operations expert focused on scaling infrastructure businesses globally.',
                },
              ].map((person) => (
                <li key={person.name} className="sm:py-8">
                  <div className="space-y-4">
                    <img className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56 object-cover" src={person.image} alt="" />
                    <div className="space-y-2 text-center">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-gray-900">{person.name}</h3>
                        <p className="text-primary-600">{person.role}</p>
                      </div>
                      <p className="text-gray-500 px-4">{person.bio}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your infrastructure?</span>
            <span className="block text-primary-200">Join the InfraBit family today.</span>
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
      </div>
    </div>
  );
};

export default About;
