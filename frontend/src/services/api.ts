// API service for handling backend communication

const API_URL = 'https://localhost:7039'; // .NET Core default HTTPS port

/**
 * Fetch utility metrics from the API
 */
export const fetchUtilityMetrics = async () => {
  try {
    const response = await fetch(`${API_URL}/api/metrics`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch utility metrics:', error);
    throw error;
  }
};

/**
 * Fetch weather data from the API
 */
export const fetchWeatherData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/weather`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};
