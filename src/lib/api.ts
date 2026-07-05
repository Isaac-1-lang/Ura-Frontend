const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }

  // Handle empty responses
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

export const api = {
  get: (endpoint: string, options?: RequestInit) => fetchWithAuth(endpoint, { ...options, method: 'GET' }),
  post: (endpoint: string, data: any, options?: RequestInit) => fetchWithAuth(endpoint, { ...options, method: 'POST', body: JSON.stringify(data) }),
  patch: (endpoint: string, data: any, options?: RequestInit) => fetchWithAuth(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(data) }),
  delete: (endpoint: string, options?: RequestInit) => fetchWithAuth(endpoint, { ...options, method: 'DELETE' }),
};
