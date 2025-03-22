import { TimeFilter } from '../../types/filters';
import { Transaction, UtmSource, Gender, Device } from '../../types/transaction';
import { calculateAgeGroup, calculateStatsFn, filterTransactionsFn } from './FiltersContext.helpers';
import { SEVEN_DAYS } from "../../constants/time";

describe('FiltersContext.helpers', () => {
  describe('calculateAgeGroup', () => {
    const now = new Date('2024-01-01').getTime();
    beforeAll(() => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(now);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    const testCases = [
      { age: 10, expected: 'Under 15' },
      { age: 15, expected: '15-19' },
      { age: 25, expected: '20-29' },
      { age: 35, expected: '30-39' },
      { age: 45, expected: '40-49' },
      { age: 55, expected: '50+' },
    ];

    testCases.forEach(({ age, expected }) => {
      it(`should return ${expected} for age ${age}`, () => {
        const birthdayTime = now - (age * 365 * 24 * 60 * 60 * 1000);
        expect(calculateAgeGroup(birthdayTime)).toBe(expected);
      });
    });
  });

  describe('calculateStatsFn', () => {
    const mockTransactions: Transaction[] = [
      {
        transaction_id: '1',
        customer_id: 'c1',
        revenue_usd: 100,
        transaction_time: new Date('2024-01-01').getTime(),
        utm_source: UtmSource.Google,
        customer_metadata: {
          birthday_time: new Date('1990-01-01').getTime(),
          gender: 'male' as Gender,
          country: 'US',
          device: 'web' as Device
        }
      },
      {
        transaction_id: '2',
        customer_id: 'c2',
        revenue_usd: 200,
        transaction_time: new Date('2024-01-02').getTime(),
        utm_source: UtmSource.Facebook,
        customer_metadata: {
          birthday_time: new Date('1995-01-01').getTime(),
          gender: 'female' as Gender,
          country: 'UK',
          device: 'mobile' as Device
        }
      }
    ];

    it('should calculate correct stats for all time', () => {
      const stats = calculateStatsFn(mockTransactions, mockTransactions, true, TimeFilter.ALL_TIME);
      expect(stats).toEqual({
        totalRevenue: 300,
        totalTransactions: 2,
        uniqueCustomers: 2,
        revenueChange: 0,
        transactionsChange: 0,
        customersChange: 0
      });
    });

    it('should calculate correct stats with changes for last 7 days', () => {
      const now = new Date('2024-01-07').getTime();
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(now);

      const currentPeriodTx: Transaction = {
        ...mockTransactions[0],
        transaction_time: now - (2 * 24 * 60 * 60 * 1000)
      };

      const previousPeriodTx: Transaction = {
        ...mockTransactions[1],
        transaction_time: now - (10 * 24 * 60 * 60 * 1000)
      };

      const allTx = [currentPeriodTx, previousPeriodTx];
      const filteredTx = [currentPeriodTx];

      const stats = calculateStatsFn(allTx, filteredTx, false, TimeFilter.LAST_7_DAYS);
      expect(stats.totalRevenue).toBe(100);
      expect(stats.totalTransactions).toBe(1);
      expect(stats.uniqueCustomers).toBe(1);
    });
  });

  describe('filterTransactionsFn', () => {
    const now = new Date().getTime();
    const mockTransactions: Transaction[] = [
      {
        transaction_id: '1',
        customer_id: 'c1',
        revenue_usd: 100,
        transaction_time: now - (2 * SEVEN_DAYS),
        utm_source: UtmSource.Google,
        customer_metadata: {
          birthday_time: new Date('1990-01-01').getTime(),
          gender: 'male' as Gender,
          country: 'US',
          device: 'web' as Device
        }
      },
      {
        transaction_id: '2',
        customer_id: 'c2',
        revenue_usd: 200,
        transaction_time: now - (10 * SEVEN_DAYS),
        utm_source: UtmSource.Facebook,
        customer_metadata: {
          birthday_time: new Date('1995-01-01').getTime(),
          gender: 'female' as Gender,
          country: 'UK',
          device: 'mobile' as Device
        }
      }
    ];

    beforeAll(() => {
      jest.spyOn(Date.prototype, 'getTime').mockReturnValue(now);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should filter by time period - last 7 days', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.LAST_7_DAYS, {
        utmSources: [],
        ageGroups: [],
        gender: [],
        revenueRange: { min: 0, max: Infinity },
        countries: []
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].transaction_id).toBe('1');
    });

    it('should filter by UTM source', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
        utmSources: [UtmSource.Google],
        ageGroups: [],
        gender: [],
        revenueRange: { min: 0, max: Infinity },
        countries: []
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].utm_source).toBe(UtmSource.Google);
    });

    it('should filter by age group', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
        utmSources: [],
        ageGroups: ['30-39'],
        gender: [],
        revenueRange: { min: 0, max: Infinity },
        countries: []
      });
      expect(filtered).toHaveLength(1);
    });

    it('should filter by gender', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
        utmSources: [],
        ageGroups: [],
        gender: ['female'],
        revenueRange: { min: 0, max: Infinity },
        countries: []
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].customer_metadata.gender).toBe('female');
    });

    it('should filter by revenue range', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
        utmSources: [],
        ageGroups: [],
        gender: [],
        revenueRange: { min: 150, max: 250 },
        countries: []
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].revenue_usd).toBe(200);
    });

    it('should filter by country', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.ALL_TIME, {
        utmSources: [],
        ageGroups: [],
        gender: [],
        revenueRange: { min: 0, max: Infinity },
        countries: ['UK']
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].customer_metadata.country).toBe('UK');
    });

    it('should combine multiple filters', () => {
      const filtered = filterTransactionsFn(mockTransactions, TimeFilter.LAST_30_DAYS, {
        utmSources: [UtmSource.Facebook],
        ageGroups: ['20-29'],
        gender: ['female'],
        revenueRange: { min: 150, max: 250 },
        countries: []
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].transaction_id).toBe('2');
    });
  });
}); 