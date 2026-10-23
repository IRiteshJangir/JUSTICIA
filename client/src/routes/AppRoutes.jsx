import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
const HomePage = lazy(() => import('../pages/public/HomePage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const PracticeAreasPage = lazy(() => import('../pages/public/PracticeAreasPage'));
const PracticeAreaDetailPage = lazy(() => import('../pages/public/PracticeAreaDetailPage'));
const CaseStudiesPage = lazy(() => import('../pages/public/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('../pages/public/CaseStudyDetailPage'));
const BlogPage = lazy(() => import('../pages/public/BlogPage'));
const BlogDetailPage = lazy(() => import('../pages/public/BlogDetailPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const AppointmentPage = lazy(() => import('../pages/public/AppointmentPage'));
const FAQPage = lazy(() => import('../pages/public/FAQPage'));
const TeamPage = lazy(() => import('../pages/public/TeamPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Admin Pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const AppointmentsManagePage = lazy(() => import('../pages/admin/AppointmentsManagePage'));
const PracticeAreasManagePage = lazy(() => import('../pages/admin/PracticeAreasManagePage'));
const CaseStudiesManagePage = lazy(() => import('../pages/admin/CaseStudiesManagePage'));
const BlogsManagePage = lazy(() => import('../pages/admin/BlogsManagePage'));
const BlogCategoriesManagePage = lazy(() => import('../pages/admin/BlogCategoriesManagePage'));
const EnquiriesManagePage = lazy(() => import('../pages/admin/EnquiriesManagePage'));
const FAQsManagePage = lazy(() => import('../pages/admin/FAQsManagePage'));
const TestimonialsManagePage = lazy(() => import('../pages/admin/TestimonialsManagePage'));
const TeamManagePage = lazy(() => import('../pages/admin/TeamManagePage'));
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage'));
const ProfilePage = lazy(() => import('../pages/admin/ProfilePage'));

// Loading Fallback
const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D99A32]"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="practice-areas" element={<PracticeAreasPage />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaDetailPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="case-studies/:slug" element={<CaseStudyDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="book-appointment" element={<AppointmentPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Auth Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="appointments" element={<AppointmentsManagePage />} />
          <Route path="practice-areas" element={<PracticeAreasManagePage />} />
          <Route path="case-studies" element={<CaseStudiesManagePage />} />
          <Route path="blogs" element={<BlogsManagePage />} />
          <Route path="blog-categories" element={<BlogCategoriesManagePage />} />
          <Route path="enquiries" element={<EnquiriesManagePage />} />
          <Route path="faqs" element={<FAQsManagePage />} />
          <Route path="testimonials" element={<TestimonialsManagePage />} />
          <Route path="team" element={<TeamManagePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
