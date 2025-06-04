const BASE_URL = 'https://fast-api-project-delta.vercel.app';

export const apiService = {

     postlogin: async (username, password) => {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }
  
      return response.json(); // Should return token or user info
    },
  
  getDeveloperMetrics: async () => {
    const response = await fetch(`${BASE_URL}/developer-metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch developer metrics');
    }
    return response.json();
  },

  getEventStream: async () => {
    const response = await fetch(`${BASE_URL}/event-stream`);
    if (!response.ok) {
      throw new Error('Failed to fetch event stream');
    }
    return response.json();
  },

  getOverviewMetrics: async () => {
    const response = await fetch(`${BASE_URL}/overview-metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch overview metrics');
    }
    return response.json();
  },

  getSystemMetrics: async () => {
    const response = await fetch(`${BASE_URL}/system-metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch system metrics');
    }
    return response.json();
  },

  getEventTrends: async () => {
    const response = await fetch(`${BASE_URL}/event-trends`);
    if (!response.ok) {
      throw new Error('Failed to fetch event trends');
    }
    return response.json();
  },

  getUserInsights: async () => {
    const response = await fetch(`${BASE_URL}/user-insights`);
    if (!response.ok) {
      throw new Error('Failed to fetch user insights');
    }
    return response.json();
  },

  getAlerts: async () => {
    const response = await fetch(`${BASE_URL}/alerts`);
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    return response.json();
  },
};
