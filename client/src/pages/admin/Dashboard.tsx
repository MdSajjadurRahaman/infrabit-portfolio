import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getProjects } from '../../services/api';
import { getServices } from '../../services/api';
import { getTeamMembers } from '../../services/api';
import { getTestimonials } from '../../services/api';

interface EntityCount {
  projects: number;
  services: number;
  team: number;
  testimonials: number;
}

const Dashboard = () => {
  const [counts, setCounts] = useState<EntityCount>({
    projects: 0,
    services: 0,
    team: 0,
    testimonials: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        
        const [projectsRes, servicesRes, teamRes, testimonialsRes] = await Promise.all([
          getProjects(),
          getServices(),
          getTeamMembers(),
          getTestimonials()
        ]);
        
        setCounts({
          projects: projectsRes.data.length,
          services: servicesRes.data.length,
          team: teamRes.data.length,
          testimonials: testimonialsRes.data.length
        });
      } catch (err) {
        console.error('Error fetching counts:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCounts();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading dashboard data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="text-red-500">{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="text-xl font-medium mb-6">Welcome to your admin dashboard</div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Projects"
          count={counts.projects}
          linkTo="/admin/projects"
          color="bg-blue-100 text-blue-800"
        />
        <DashboardCard
          title="Services"
          count={counts.services}
          linkTo="/admin/services"
          color="bg-green-100 text-green-800"
        />
        <DashboardCard
          title="Team Members"
          count={counts.team}
          linkTo="/admin/team"
          color="bg-purple-100 text-purple-800"
        />
        <DashboardCard
          title="Testimonials"
          count={counts.testimonials}
          linkTo="/admin/testimonials"
          color="bg-amber-100 text-amber-800"
        />
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard title="Add New Project" linkTo="/admin/projects/new" />
          <QuickActionCard title="Add New Service" linkTo="/admin/services/new" />
          <QuickActionCard title="Add Team Member" linkTo="/admin/team/new" />
          <QuickActionCard title="Add Testimonial" linkTo="/admin/testimonials/new" />
        </div>
      </div>
    </AdminLayout>
  );
};

interface DashboardCardProps {
  title: string;
  count: number;
  linkTo: string;
  color: string;
}

const DashboardCard = ({ title, count, linkTo, color }: DashboardCardProps) => {
  return (
    <a 
      href={linkTo} 
      className={`rounded-lg p-6 ${color} hover:opacity-90 transition-opacity`}
    >
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-sm">{title}</div>
    </a>
  );
};

interface QuickActionCardProps {
  title: string;
  linkTo: string;
}

const QuickActionCard = ({ title, linkTo }: QuickActionCardProps) => {
  return (
    <a 
      href={linkTo} 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="text-sm font-medium">{title}</div>
    </a>
  );
};

export default Dashboard;
