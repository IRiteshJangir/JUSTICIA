import React from 'react';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      {Icon && (
        <div className="w-16 h-16 mb-4 rounded-full bg-primary/5 flex items-center justify-center text-gold">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-xl font-serif font-bold text-dark mb-2">{title}</h3>
      {description && <p className="text-gray-500 mb-6 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
