import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, Scale, FileText, BookOpen, Tag, 
  Mail, HelpCircle, MessageSquare, Users, Settings, LogOut, Menu, X, User
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Practice Areas', path: '/admin/practice-areas', icon: Scale },
    { name: 'Case Studies', path: '/admin/case-studies', icon: FileText },
    { name: 'Blog Posts', path: '/admin/blogs', icon: BookOpen },
    { name: 'Blog Categories', path: '/admin/blog-categories', icon: Tag },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Mail },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Team', path: '/admin/team', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // In a real app, dispatch logout action
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#080D10] text-gray-300 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 bg-[#11191D] border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Scale size={20} className="text-[#D99A32]" />
            <span className="font-serif text-lg font-bold text-white">JUSTICIA Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center px-6 py-3 text-sm font-medium transition-colors border-l-4 ${
                      isActive 
                        ? 'bg-[#11191D] text-[#D99A32] border-[#D99A32]' 
                        : 'text-gray-400 border-transparent hover:bg-[#11191D] hover:text-[#F0B84C]'
                    }`
                  }
                >
                  <Icon size={18} className="mr-3 flex-shrink-0" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors"
          >
            <LogOut size={18} className="mr-3 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu size={24} />
            </button>
            <h1 className="font-serif text-xl font-semibold text-gray-800 hidden sm:block">
              Control Panel
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-semibold text-gray-800">Admin User</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#11191D] border-2 border-[#D99A32] flex items-center justify-center text-[#D99A32]">
                  <User size={20} />
                </div>
              </div>

              {/* Dropdown menu could go here */}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F5F5F5]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
