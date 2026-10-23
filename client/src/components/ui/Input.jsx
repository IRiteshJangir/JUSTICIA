import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, icon: Icon, className = '', dark = false, ...rest }, ref) => {
  const baseInput = "w-full rounded px-4 py-3 outline-none transition-all duration-300 border focus:border-gold";
  const bgClasses = dark 
    ? "bg-primary-light border-white/10 text-white focus:bg-primary" 
    : "bg-white border-gray-200 text-dark focus:shadow-md";

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={`block mb-2 text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${dark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        )}
        <input
          ref={ref}
          className={`${baseInput} ${bgClasses} ${Icon ? 'pl-10' : ''} ${error ? 'border-red-500' : ''}`}
          {...rest}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
