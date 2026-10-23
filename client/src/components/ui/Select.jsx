import React, { forwardRef } from 'react';

const Select = forwardRef(({ label, error, options = [], className = '', dark = false, ...rest }, ref) => {
  const baseInput = "w-full rounded px-4 py-3 outline-none transition-all duration-300 border focus:border-gold appearance-none";
  const bgClasses = dark 
    ? "bg-primary-light border-white/10 text-white focus:bg-primary" 
    : "bg-white border-gray-200 text-dark focus:shadow-md";

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={`block mb-2 text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>}
      <div className="relative">
        <select
          ref={ref}
          className={`${baseInput} ${bgClasses} ${error ? 'border-red-500' : ''}`}
          {...rest}
        >
          <option value="">Select an option</option>
          {options.map((opt, i) => (
            <option key={i} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className={`w-4 h-4 fill-current ${dark ? 'text-gray-400' : 'text-gray-500'}`} viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
