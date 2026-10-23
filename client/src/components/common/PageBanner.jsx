import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageBanner = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-primary text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container-custom relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">{title}</h1>
        
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-gold transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
