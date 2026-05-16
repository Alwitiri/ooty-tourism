export function sanitize(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#x27;' })[c] || c);
}

export function sanitizeObject(obj, keys) {
  if (!obj || typeof obj !== 'object') return obj;
  const result = { ...obj };
  (keys || Object.keys(result)).forEach((k) => {
    if (typeof result[k] === 'string') result[k] = sanitize(result[k]);
  });
  return result;
}
