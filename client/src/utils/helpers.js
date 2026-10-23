export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'confirmed': return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
    case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};

export const getStatusBadge = (status) => {
  const base = "px-2.5 py-0.5 rounded-full text-xs font-medium border";
  return `${base} ${getStatusColor(status)}`;
};

export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const calculateReadingTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};
