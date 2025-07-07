import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, classNames } from '../../src/utils';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('formats positive amounts correctly', () => {
      expect(formatCurrency(123.45)).toBe('$123.45');
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('formats negative amounts correctly', () => {
      expect(formatCurrency(-123.45)).toBe('-$123.45');
    });

    it('handles large numbers with proper formatting', () => {
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
    });

    it('handles decimal precision correctly', () => {
      expect(formatCurrency(123.456)).toBe('$123.46'); // Rounds to 2 decimal places
      expect(formatCurrency(123.1)).toBe('$123.10');
    });
  });

  describe('formatDate', () => {
    it('formats valid date strings correctly', () => {
      const result = formatDate('2025-07-07T12:00:00.000Z');
      expect(result).toMatch(/Jul 7, 2025/);
    });

    it('formats ISO date strings correctly', () => {
      const result = formatDate('2025-12-25T12:00:00.000Z');
      expect(result).toMatch(/Dec 25, 2025/);
    });

    it('handles different date formats', () => {
      const result = formatDate('2025-01-01T12:00:00.000Z');
      expect(result).toMatch(/Jan 1, 2025/);
    });

    it('returns a properly formatted date string', () => {
      const result = formatDate('2025-07-07T12:00:00.000Z');
      expect(typeof result).toBe('string');
      expect(result).toBeTruthy();
      // Just verify it contains expected elements without being timezone-specific
      expect(result).toContain('2025');
      expect(result).toContain('Jul');
    });
  });

  describe('classNames', () => {
    it('combines multiple class strings', () => {
      expect(classNames('class1', 'class2', 'class3')).toBe('class1 class2 class3');
    });

    it('filters out undefined values', () => {
      expect(classNames('class1', undefined, 'class2')).toBe('class1 class2');
    });

    it('filters out false values', () => {
      expect(classNames('class1', false, 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      expect(
        classNames(
          'base-class',
          isActive && 'active-class',
          isDisabled && 'disabled-class'
        )
      ).toBe('base-class active-class');
    });

    it('handles empty input', () => {
      expect(classNames()).toBe('');
    });

    it('handles all falsy values', () => {
      expect(classNames(false, undefined, false)).toBe('');
    });

    it('handles mixed valid and invalid inputs', () => {
      expect(
        classNames('valid', '', false, 'another-valid', undefined, 'final')
      ).toBe('valid another-valid final');
    });
  });
});