import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UtilityMetrics } from '../../src/components/UtilityMetrics';
import * as apiService from '../../src/services/api';

describe('UtilityMetrics', () => {
  it('renders loading state initially', () => {
    vi.spyOn(apiService, 'fetchUtilityMetrics').mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    render(<UtilityMetrics />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders utility metrics when loaded', async () => {
    const mockMetrics = [
      {
        type: 'Electricity',
        value: 67.8,
        unit: 'kWh',
        date: new Date().toISOString(),
      },
      {
        type: 'Water',
        value: 124.5,
        unit: 'Gallons',
        date: new Date().toISOString(),
      },
    ];

    vi.spyOn(apiService, 'fetchUtilityMetrics').mockResolvedValue(mockMetrics);

    render(<UtilityMetrics />);

    // Wait for metrics to be displayed
    expect(await screen.findByText('Electricity')).toBeInTheDocument();
    expect(await screen.findByText('Water')).toBeInTheDocument();
    expect(await screen.findByText('67.8')).toBeInTheDocument();
    expect(await screen.findByText('124.5')).toBeInTheDocument();
  });

  it('displays error message when API fails', async () => {
    vi.spyOn(apiService, 'fetchUtilityMetrics').mockRejectedValue(
      new Error('API error')
    );

    render(<UtilityMetrics />);

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });
});
