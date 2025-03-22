import { UtmSource, AgeGroup, Gender } from './transaction';

export enum TimeFilter {
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  ALL_TIME = 'all_time'
}

export interface AdvancedFilters {
  utmSources: UtmSource[];
  ageGroups: AgeGroup[];
  revenueRange: {
    min: number;
    max: number;
  };
  gender: Gender[];
  countries: string[];
}

export const DEFAULT_ADVANCED_FILTERS: AdvancedFilters = {
  utmSources: [],
  ageGroups: [],
  revenueRange: {
    min: 0,
    max: Infinity
  },
  gender: [],
  countries: []
}; 