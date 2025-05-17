import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/infrabit')
  .then(() => {
    console.log('Connected to MongoDB for seeding');
    seedDatabase();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Project.deleteMany({});
    await Service.deleteMany({});
    await TeamMember.deleteMany({});
    await Testimonial.deleteMany({});

    console.log('Cleared existing data');

    // Seed services
    const services = [
      {
        title: 'Cloud Infrastructure',
        description: 'Robust, scalable cloud solutions tailored to your business needs',
        icon: 'cloud',
        features: ['AWS/Azure/GCP', 'Hybrid Cloud', 'Cloud Migration', 'Cost Optimization'],
        longDescription: 'Our cloud infrastructure services provide comprehensive solutions for businesses looking to leverage cloud technology. We design, implement, and manage cloud environments that are secure, scalable, and cost-effective.'
      },
      {
        title: 'DevOps Automation',
        description: 'Streamline your development workflow with CI/CD and automation',
        icon: 'code',
        features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Containerization', 'Monitoring'],
        longDescription: 'Our DevOps automation services help organizations streamline their development workflows and accelerate software delivery. We implement continuous integration and continuous deployment (CI/CD) pipelines, containerize applications, and automate infrastructure provisioning.'
      },
      {
        title: 'Security Solutions',
        description: 'Protect your digital assets with enterprise-grade security',
        icon: 'shield',
        features: ['Vulnerability Assessment', 'Compliance', 'Identity Management', 'Encryption'],
        longDescription: 'Our security solutions provide comprehensive protection for your digital assets. We conduct thorough vulnerability assessments, implement compliance controls, manage identity and access, and employ encryption strategies.'
      },
      {
        title: 'Managed IT Services',
        description: '24/7 support and maintenance for your infrastructure',
        icon: 'support',
        features: ['System Monitoring', 'Incident Response', 'Patch Management', 'Help Desk'],
        longDescription: 'Our managed IT services provide round-the-clock monitoring and support for your infrastructure. We proactively identify and address issues before they impact your business, handle system updates and patch management, and provide responsive help desk support.'
      }
    ];

    await Service.insertMany(services);
    console.log('Services seeded successfully');

    // Seed projects
    const projects = [
      {
        title: 'Cloud Migration for FinTech',
        description: 'Migrated legacy financial systems to a secure AWS cloud infrastructure with zero downtime.',
        imageUrl: 'https://images.unsplash.com/photo-1667984550708-a6beba23cb4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
        category: 'cloud',
        featured: true,
        client: 'Global FinTech Solutions',
        duration: '6 months',
        challenge: 'The client needed to migrate their legacy on-premise financial systems to the cloud without disrupting their 24/7 operations.',
        solution: 'We designed a phased migration approach using AWS services including EC2, RDS, and S3, coupled with Terraform for infrastructure as code.',
        results: 'Successfully migrated all systems with zero downtime. Achieved 40% reduction in infrastructure costs and 60% improvement in system performance.',
      },
      {
        title: 'DevOps Pipeline Automation',
        description: 'Implemented CI/CD pipelines reducing deployment time from days to minutes for a software company.',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['Jenkins', 'GitHub Actions', 'Docker', 'Ansible'],
        category: 'devops',
        featured: true,
        client: 'SoftTech Innovations',
        duration: '3 months',
        challenge: 'The client was experiencing lengthy deployment cycles that slowed down their ability to release new features.',
        solution: 'We implemented a comprehensive CI/CD pipeline using Jenkins and GitHub Actions, containerized their applications with Docker, and automated infrastructure configuration with Ansible.',
        results: 'Deployment time reduced from 2 days to 15 minutes. Release frequency increased by 400%. Developer productivity improved by 35%.',
      },
      {
        title: 'Hybrid Cloud Infrastructure',
        description: 'Designed and implemented a hybrid cloud solution connecting on-premises data centers with Azure cloud services.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['Azure', 'VMware', 'ExpressRoute', 'Active Directory'],
        category: 'hybrid',
        featured: false,
      },
      {
        title: 'Security Operations Center',
        description: 'Built a comprehensive SOC with real-time threat monitoring and automated incident response.',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['Splunk', 'Crowdstrike', 'PaloAlto', 'KQL'],
        category: 'security',
        featured: false,
      },
      {
        title: 'Serverless Web Application',
        description: 'Developed a high-performance web application using serverless architecture for a retail client.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'S3'],
        category: 'serverless',
        featured: true,
      }
    ];

    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    // Seed team members
    const teamMembers = [
      {
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
        name: 'Elena Rodriguez',
        position: 'Security Architect',
        bio: 'Elena is a certified security expert with experience in implementing enterprise security solutions. She previously worked at a major cybersecurity firm protecting critical infrastructure.',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      }
    ];

    await TeamMember.insertMany(teamMembers);
    console.log('Team members seeded successfully');

    // Seed testimonials
    const testimonials = [
      {
        name: 'John Smith',
        position: 'CTO',
        company: 'Global Finance Inc.',
        testimonial: 'InfraBit transformed our infrastructure and reduced our cloud costs by 40%. Their team was professional, knowledgeable, and exceeded our expectations.',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 5,
        featured: true,
      },
      {
        name: 'Sarah Johnson',
        position: 'VP of Engineering',
        company: 'TechStart Solutions',
        testimonial: 'We partnered with InfraBit to implement our DevOps pipeline, and the results have been incredible. Deployment times went from days to minutes.',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 5,
        featured: true,
      },
      {
        name: 'Michael Chang',
        position: 'Director of IT',
        company: 'Retail Innovations',
        testimonial: 'The team at InfraBit helped us implement a serverless architecture that significantly improved our application performance while reducing operational costs.',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        rating: 4,
        featured: false,
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded successfully');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};
