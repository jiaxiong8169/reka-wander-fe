export const collapseText = (text, len) => {
  if (!text) return '';

  return text.slice(0, len) + (text.length > len ? '...' : '');
};
