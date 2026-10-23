import React from 'react';

const Card = ({ variant = 'light', hover = true, className = '', children, ...rest }) => {
  const variants = {
    light: 'bg-white border border-gray-100',
    dark: 'bg-primary-light border border-white/10 text-white'
  };

  const hoverClasses = hover ? (variant === 'light' ? 'hover:shadow-xl hover:border-gold/20' : 'hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/5') : '';

  return (
    <div className={`rounded-xl transition-all duration-300 p-6 ${variants[variant]} ${hoverClasses} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Card;
