import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const spinner = <Loader2 className={`${sizes[size]} text-gold animate-spin`} />;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
