import React, { forwardRef } from 'react';

const TextArea = forwardRef(({ label, error, className = '', dark = false, ...rest }, ref) => {
  const baseInput = "w-full rounded px-4 py-3 outline-none transition-all duration-300 border focus:border-gold resize-y min-h-[120px]";
  const bgClasses = dark 
    ? "bg-primary-light border-white/10 text-white focus:bg-primary" 
    : "bg-white border-gray-200 text-dark focus:shadow-md";

  return (
    <div className={`w-full ${className}`}>
      {label && <label className={`block mb-2 text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>}
      <textarea
        ref={ref}
        className={`${baseInput} ${bgClasses} ${error ? 'border-red-500' : ''}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
