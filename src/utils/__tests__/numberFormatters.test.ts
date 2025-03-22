import { formatNumber, formatCurrency } from '../numberFormatters';

describe('formatNumber', () => {
  describe('with compact=true (default)', () => {
    it('should format billions correctly', () => {
      expect(formatNumber(1500000000)).toBe('1.5B');
      expect(formatNumber(2750000000)).toBe('2.8B');
    });

    it('should format millions correctly', () => {
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(2750000)).toBe('2.8M');
    });

    it('should format thousands correctly', () => {
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(2750)).toBe('2.8K');
    });

    it('should format numbers less than 1000 correctly', () => {
      expect(formatNumber(150)).toBe('150.0');
      expect(formatNumber(275.5)).toBe('275.5');
    });
  });

  describe('with compact=false', () => {
    it('should format numbers with full precision', () => {
      expect(formatNumber(1234567, { compact: false })).toBe('1,234,567.0');
      expect(formatNumber(1234.567, { compact: false })).toBe('1,234.6');
    });
  });

  describe('with custom decimals', () => {
    it('should respect custom decimal places', () => {
      expect(formatNumber(1500000, { decimals: 2 })).toBe('1.50M');
      expect(formatNumber(1234.567, { decimals: 3 })).toBe('1.235K');
    });
  });

  describe('with prefix', () => {
    it('should add prefix to formatted numbers', () => {
      expect(formatNumber(1500000, { prefix: '$' })).toBe('$1.5M');
      expect(formatNumber(1234, { prefix: '€' })).toBe('€1.2K');
    });
  });

  describe('edge cases', () => {
    it('should handle zero correctly', () => {
      expect(formatNumber(0)).toBe('0.0');
      expect(formatNumber(0, { prefix: '$' })).toBe('$0.0');
    });

    it('should handle negative numbers correctly', () => {
      expect(formatNumber(-1500000)).toBe('-1.5M');
      expect(formatNumber(-1234, { prefix: '$' })).toBe('-$1.2K');
    });

    it('should handle decimal numbers close to next unit threshold', () => {
      expect(formatNumber(999999)).toBe('1.0M');
      expect(formatNumber(999499)).toBe('999.5K');
    });
  });
});

describe('formatCurrency', () => {
  it('should format whole numbers correctly', () => {
    expect(formatCurrency(1234)).toBe('$1,234.00');
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('should format decimal numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
    expect(formatCurrency(1234.567)).toBe('$1,234.57'); // Should round to 2 decimals
  });

  it('should handle zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    expect(formatCurrency(-1000000)).toBe('-$1,000,000.00');
  });

  it('should handle very large numbers correctly', () => {
    expect(formatCurrency(1234567890.12)).toBe('$1,234,567,890.12');
  });
});
