import React from 'react';

const SectionHeader = ({ label, title, description, centered = false, light = false }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && <span className="section-label block">{label}</span>}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : 'text-dark'}`}>{title}</h2>
      {description && (
        <p className={`max-w-2xl text-lg ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
