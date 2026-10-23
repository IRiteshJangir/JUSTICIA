import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, Menu, X, Facebook, Linkedin, Instagram, 
  Phone, Mail, MapPin, Clock, Calendar, MessageCircle, ChevronDown
} from 'lucide-react';

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// WhatsApp Floating Button
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918879043210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
};

// TopBar Component
const TopBar = () => {
  return (
    <div className="bg-[#080D10] text-gray-300 py-2 px-4 md:px-8 text-sm hidden lg:flex justify-between items-center border-b border-gray-800">
      <div className="font-serif italic tracking-wide text-gray-400">
        Effective Legal Solutions. Trusted Advice. Always.
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-[#D99A32]" />
          <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone size={14} className="text-[#D99A32]" />
          <span>+91 88790 43210</span>
        </div>
        <div className="flex items-center space-x-3 border-l border-gray-700 pl-4">
          <a href="#" className="hover:text-[#D99A32] transition-colors"><Facebook size={16} /></a>
          <a href="#" className="hover:text-[#D99A32] transition-colors"><Linkedin size={16} /></a>
          <a href="#" className="hover:text-[#D99A32] transition-colors"><Instagram size={16} /></a>
        </div>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pagesDropdown, setPagesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Practice Areas', path: '/practice-areas' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
  ];

  const pagesLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Team', path: '/team' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0a1114] shadow-lg shadow-black/20' : 'bg-[#080D10]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-[#D99A32] p-2 bg-[#11191D] rounded-lg group-hover:bg-[#1a252b] transition-colors">
              <Scale size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-white tracking-wider">JUSTICIA</h1>
              <p className="text-[#D99A32] text-[10px] tracking-widest uppercase font-semibold">Advocates & Legal Consultants</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-[#F0B84C] ${isActive(link.path) ? 'text-[#D99A32]' : 'text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Pages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPagesDropdown(true)}
              onMouseLeave={() => setPagesDropdown(false)}
            >
              <button className={`flex items-center space-x-1 font-medium transition-colors hover:text-[#F0B84C] ${isActive('/faq') || isActive('/team') ? 'text-[#D99A32]' : 'text-gray-300'}`}>
                <span>Pages</span>
                <ChevronDown size={16} />
              </button>
              
              <AnimatePresence>
                {pagesDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-[#11191D] border border-gray-800 rounded-md shadow-xl overflow-hidden"
                  >
                    {pagesLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`block px-4 py-3 text-sm hover:bg-[#080D10] transition-colors ${isActive(link.path) ? 'text-[#D99A32]' : 'text-gray-300'}`}
                        onClick={() => setPagesDropdown(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className={`font-medium transition-colors hover:text-[#F0B84C] ${isActive('/contact') ? 'text-[#D99A32]' : 'text-gray-300'}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Book Button (Desktop) */}
          <div className="hidden lg:block">
            <Link
              to="/book-appointment"
              className="bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] px-6 py-3 font-semibold rounded transition-colors flex items-center space-x-2"
            >
              <Calendar size={18} />
              <span>Book Consultation</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-300 hover:text-white p-2"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#11191D] shadow-2xl z-50 flex flex-col overflow-y-auto"
            >
              <div className="p-6 flex justify-between items-center border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <Scale size={24} className="text-[#D99A32]" />
                  <span className="font-serif text-xl font-bold text-white">JUSTICIA</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 py-6 px-6 flex flex-col space-y-6">
                {[...navLinks, ...pagesLinks, { name: 'Contact Us', path: '/contact' }].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-lg font-medium ${isActive(link.path) ? 'text-[#D99A32]' : 'text-gray-300'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-800">
                <Link
                  to="/book-appointment"
                  className="w-full bg-[#D99A32] text-[#080D10] py-3 rounded font-semibold flex items-center justify-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar size={18} />
                  <span>Book Consultation</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#080D10] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Scale size={32} className="text-[#D99A32]" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">JUSTICIA</h2>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Premium legal consultancy delivering exceptional results through strategic advocacy, deep expertise, and unwavering dedication to our clients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#D99A32] flex items-center justify-center text-[#D99A32] hover:bg-[#D99A32] hover:text-[#080D10] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D99A32] flex items-center justify-center text-[#D99A32] hover:bg-[#D99A32] hover:text-[#080D10] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#D99A32] flex items-center justify-center text-[#D99A32] hover:bg-[#D99A32] hover:text-[#080D10] transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="font-serif text-xl text-white font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D99A32]"></span>
            </h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Practice Areas', 'Case Studies', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-') === 'home' ? '' : item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-[#D99A32] transition-colors flex items-center">
                    <span className="mr-2">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="font-serif text-xl text-white font-semibold mb-6 relative inline-block">
              Practice Areas
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D99A32]"></span>
            </h3>
            <ul className="space-y-3">
              {['Criminal', 'Family', 'Civil', 'Property', 'Corporate', 'Tax & GST'].map((item) => (
                <li key={item}>
                  <Link to={`/practice-areas/${item.toLowerCase().replace(' & ', '-')}`} className="text-gray-400 hover:text-[#D99A32] transition-colors flex items-center">
                    <span className="mr-2">›</span> {item} Law
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h3 className="font-serif text-xl text-white font-semibold mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D99A32]"></span>
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start text-gray-400">
                <MapPin size={20} className="text-[#D99A32] mr-3 mt-1 flex-shrink-0" />
                <span>123 Legal Avenue, Justice Towers,<br/>New Delhi, 110001</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={20} className="text-[#D99A32] mr-3 flex-shrink-0" />
                <span>+91 88790 43210</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Mail size={20} className="text-[#D99A32] mr-3 flex-shrink-0" />
                <span>info@justicia.com</span>
              </li>
            </ul>
            
            <form className="mt-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-[#11191D] border border-gray-700 text-white px-4 py-2 w-full focus:outline-none focus:border-[#D99A32]"
                />
                <button type="button" className="bg-[#D99A32] text-[#080D10] px-4 py-2 font-semibold hover:bg-[#F0B84C] transition-colors">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Justicia Advocates. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms-conditions" className="hover:text-gray-300">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Public Layout
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525] font-sans selection:bg-[#D99A32] selection:text-white">
      <ScrollToTop />
      <TopBar />
      <Navbar />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PublicLayout;
