import React from 'react';
import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/common';
import { Button } from '../../components/ui';

const NotFoundPage = () => {
  return (
    <div className="font-sans bg-[#080D10] min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <SEO title="Page Not Found | JUSTICIA" description="The page you are looking for does not exist." />
      
      <div className="w-24 h-24 rounded-full bg-[#11191D] border-2 border-[#D99A32] flex items-center justify-center mb-8 text-[#D99A32] shadow-[0_0_30px_rgba(217,154,50,0.15)]">
        <Scale size={48} />
      </div>
      
      <h1 className="text-8xl md:text-9xl font-serif text-white font-bold mb-4 tracking-tighter opacity-10">404</h1>
      
      <div className="-mt-16 md:-mt-20 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-white font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button className="bg-[#D99A32] hover:bg-[#F0B84C] text-[#080D10] font-bold px-8 py-4 rounded-none uppercase tracking-wide">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
