import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check for mobile screens
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (location.pathname === path) return 'bg-indigo-700 text-white font-semibold';
    if (location.pathname.startsWith(path + '/')) return 'bg-indigo-700 text-white font-semibold';
    return '';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 bg-indigo-900 dark:bg-indigo-950 text-white transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="text-xl font-bold mb-8 border-b border-indigo-700 pb-4">
            InfraBit Admin
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/admin/dashboard"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 font-medium ${isActive('/admin/dashboard')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/projects"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 ${isActive('/admin/projects')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/services"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 ${isActive('/admin/services')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/team"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 ${isActive('/admin/team')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Team Members
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/testimonials"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 ${isActive('/admin/testimonials')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/contacts"
                  className={`block px-4 py-2 rounded hover:bg-indigo-800 text-blue-300 ${isActive('/admin/contacts')}`}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  Contact Submissions
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="mt-auto border-t border-indigo-700 pt-4">
            <div className="px-4 py-2 text-sm text-gray-300">
              Logged in as: <span className="font-semibold text-white">{user}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-center py-2 text-sm bg-blue-500 text-white-400 hover:bg-indigo-800 hover:text-white rounded transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between p-4">
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
          <div>
            <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm" target="_blank">
              View Website
            </Link>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 dark:text-white">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-20"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
