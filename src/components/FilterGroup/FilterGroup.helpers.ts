import { TimeFilter } from "../../types/filters";
import { FilterOption } from "./FilterGroup.types";

export const FILTER_OPTIONS: FilterOption[] = [
    { value: TimeFilter.LAST_7_DAYS, label: 'Last 7 days' },
    { value: TimeFilter.LAST_30_DAYS, label: 'Last 30 days' },
    { value: TimeFilter.ALL_TIME, label: 'All time' }
  ];