// API configuration - works in both dev and production
export const getAPIUrl = (): string => {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000/api';
  }

  // In production, use the environment variable
  const envUrl = (import.meta.env.VITE_API_URL as string);
  if (envUrl && envUrl !== '') {
    return envUrl;
  }

  // In development or fallback
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }

  // Production fallback - assumes backend on same domain
  return '/api';
};

export const API_BASE = getAPIUrl();
