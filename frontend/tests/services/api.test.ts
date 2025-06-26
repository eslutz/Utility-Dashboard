import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from '../../src/services/api';

describe('API Service', () => {
  let fetchMock: vi.SpyInstance<
    [input: RequestInfo | URL, init?: RequestInit | undefined],
    Promise<Response>
  >;

  beforeEach(() => {
    // Mock the global fetch function
    fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve({} as Response));
  });

  afterEach(() => {
    // Clean up the mock
    fetchMock.mockRestore();
  });

  describe('fetchUtilityMetrics', () => {
    it('calls the correct endpoint', async () => {
      // Mock a successful response
      const mockResponse = {
        ok: true,
        json: async () => [{ type: 'Electricity', value: 100, unit: 'kWh' }],
      };
      fetchMock.mockResolvedValueOnce(mockResponse as Response);

      // Call the function
      await api.fetchUtilityMetrics();

      // Verify the correct endpoint was called
      expect(fetchMock).toHaveBeenCalledWith(
        'https://localhost:7039/api/metrics'
      );
    });

    it('throws an error when response is not ok', async () => {
      // Mock a failed response
      const mockResponse = {
        ok: false,
        status: 404,
      };
      fetchMock.mockResolvedValueOnce(mockResponse as Response);

      // Expect the function to throw an error
      await expect(api.fetchUtilityMetrics()).rejects.toThrow('API error: 404');
    });
  });

  describe('fetchWeatherData', () => {
    it('calls the correct endpoint', async () => {
      // Mock a successful response
      const mockResponse = {
        ok: true,
        json: async () => ({ temp: 72 }),
      };
      fetchMock.mockResolvedValueOnce(mockResponse as Response);

      // Call the function
      await api.fetchWeatherData();

      // Verify the correct endpoint was called
      expect(fetchMock).toHaveBeenCalledWith(
        'https://localhost:7039/api/weather'
      );
    });
  });
});
