import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Team from './pages/Team';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';
import Dashboard from './pages/admin/Dashboard';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import ProjectForm from './pages/admin/ProjectForm';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import ServiceForm from './pages/admin/ServiceForm';
import TeamAdmin from './pages/admin/TeamAdmin';
import TeamMemberForm from './pages/admin/TeamMemberForm';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import TestimonialForm from './pages/admin/TestimonialForm';
import ContactSubmissions from './pages/admin/ContactSubmissions';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

// Context
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Projects Admin Routes */}
                <Route 
                  path="/admin/projects" 
                  element={
                    <ProtectedRoute>
                      <ProjectsAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/projects/new" 
                  element={
                    <ProtectedRoute>
                      <ProjectForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/projects/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <ProjectForm />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Services Admin Routes */}
                <Route 
                  path="/admin/services" 
                  element={
                    <ProtectedRoute>
                      <ServicesAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services/new" 
                  element={
                    <ProtectedRoute>
                      <ServiceForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/services/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <ServiceForm />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Team Admin Routes */}
                <Route 
                  path="/admin/team" 
                  element={
                    <ProtectedRoute>
                      <TeamAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/team/new" 
                  element={
                    <ProtectedRoute>
                      <TeamMemberForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/team/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <TeamMemberForm />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Testimonials Admin Routes */}
                <Route 
                  path="/admin/testimonials" 
                  element={
                    <ProtectedRoute>
                      <TestimonialsAdmin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/testimonials/new" 
                  element={
                    <ProtectedRoute>
                      <TestimonialForm />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/testimonials/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <TestimonialForm />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Contact Submissions Route */}
                <Route 
                  path="/admin/contacts" 
                  element={
                    <ProtectedRoute>
                      <ContactSubmissions />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Public Routes */}
                <Route path="/" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <Home />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <About />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/projects" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <Projects />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/projects/:id" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <ProjectDetail />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/services" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <Services />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/team" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <Team />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <Contact />
                    </main>
                    <Footer />
                  </>
                } />
                <Route path="*" element={
                  <>
                    <Navbar />
                    <main className="flex-grow w-full">
                      <NotFound />
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
