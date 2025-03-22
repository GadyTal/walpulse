/**
 * Formats a number into a human-readable string with K, M, B suffixes
 * @param num - The number to format
 * @param options - Optional formatting options
 * @returns Formatted string
 */
export const formatNumber = (num: number, options: {
  prefix?: string;
  decimals?: number;
  compact?: boolean;
} = {}): string => {
  const { prefix = '', decimals = 1, compact = true } = options;
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  if (!compact) {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(absNum);
    return `${isNegative ? '-' : ''}${prefix}${formatted}`;
  }

  let value: number;
  let suffix = '';

  if (absNum >= 0.999999e9) {
    value = absNum / 1e9;
    suffix = 'B';
  } else if (absNum >= 0.999999e6) {
    value = absNum / 1e6;
    suffix = 'M';
  } else if (absNum >= 0.999999e3) {
    value = absNum / 1e3;
    suffix = 'K';
  } else {
    value = absNum;
  }

  const formatted = value.toFixed(decimals);
  return `${isNegative ? '-' : ''}${prefix}${formatted}${suffix}`;
};

/**
 * Formats a number as currency with K, M, B suffixes
 * @param num - The number to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  const isNegative = value < 0;
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  
  return isNegative ? `-${formatted}` : formatted;
}; 