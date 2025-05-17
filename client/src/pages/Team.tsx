import { useState, useEffect } from 'react';
import { getTeamMembers } from '../services/api';

// Types
interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeamMembers();
        setTeam(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Fallback to sample data
        setTeam([
          {
            _id: '1',
            name: 'Alex Morgan',
            position: 'Founder & CEO',
            bio: 'Alex has over 15 years of experience in IT infrastructure and cloud solutions. Prior to founding InfraBit, he led cloud transformation initiatives at several Fortune 500 companies.',
            imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
              twitter: 'https://twitter.com',
            },
          },
          {
            _id: '2',
            name: 'Samantha Chen',
            position: 'CTO',
            bio: 'With a PhD in Distributed Systems, Samantha oversees all technical aspects of InfraBit. Her research on cloud optimization has been published in leading journals.',
            imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
              github: 'https://github.com',
            },
          },
          {
            _id: '3',
            name: 'Marcus Johnson',
            position: 'Lead DevOps Engineer',
            bio: 'Marcus specializes in creating CI/CD pipelines and implementing infrastructure as code. He has helped dozens of companies automate their deployment processes.',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
              github: 'https://github.com',
            },
          },
          {
            _id: '4',
            name: 'Elena Rodriguez',
            position: 'Security Architect',
            bio: 'Elena is a certified security expert with experience in implementing enterprise security solutions. She previously worked at a major cybersecurity firm protecting critical infrastructure.',
            imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
              twitter: 'https://twitter.com',
            },
          },
          {
            _id: '5',
            name: 'David Park',
            position: 'Cloud Solutions Architect',
            bio: 'David is an AWS Certified Solutions Architect who specializes in designing scalable and cost-effective cloud architectures for businesses of all sizes.',
            imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
              github: 'https://github.com',
            },
          },
          {
            _id: '6',
            name: 'Priya Patel',
            position: 'Lead Project Manager',
            bio: 'Priya is a certified PMP with a track record of delivering complex infrastructure projects on time and within budget. She is an expert in agile methodologies.',
            imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            socialLinks: {
              linkedin: 'https://linkedin.com',
            },
          },
        ]);
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="bg-white w-full">
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              Our Team
            </h1>
            <p className="mt-4 text-xl text-primary-100">
              Meet the experts building the future of infrastructure
            </p>
          </div>
        </div>
      </div>
      
      {/* Team section */}
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Experienced Infrastructure Experts
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Our team combines deep technical expertise with business acumen to deliver exceptional results.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div 
                key={member._id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 mb-4">{member.position}</p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  
                  {/* Social links */}
                  {member.socialLinks && (
                    <div className="flex space-x-3">
                      {member.socialLinks.linkedin && (
                        <a 
                          href={member.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      
                      {member.socialLinks.twitter && (
                        <a 
                          href={member.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                      )}
                      
                      {member.socialLinks.github && (
                        <a 
                          href={member.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Join our team section */}
        <div className="mt-24 bg-gray-50 rounded-lg shadow-inner p-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals who are passionate about infrastructure and technology. Check out our open positions or send us your resume.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            View Open Positions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
