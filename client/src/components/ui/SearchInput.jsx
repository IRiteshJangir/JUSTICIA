import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  const [localValue, setLocalValue] = useState(value || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
