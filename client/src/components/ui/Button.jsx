import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  variant = 'gold', 
  size = 'md', 
  children, 
  loading = false, 
  disabled = false, 
  icon: Icon, 
  className = '', 
  ...rest 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded gap-2';
  
  const variants = {
    gold: 'bg-gold hover:bg-gold-light text-white',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white',
    white: 'bg-white text-primary hover:bg-cream',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-white/10 text-gold'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${(disabled || loading) ? 'opacity-70 cursor-not-allowed' : ''} ${className}`;

  return (
    <button 
      className={classes} 
      disabled={disabled || loading} 
      {...rest}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

export default Button;
