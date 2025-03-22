import { StatsTrend } from "../../context/FiltersContext/FiltersContext.types";

export const getTrend = (change: number): StatsTrend => {
    if (change > 0) return StatsTrend.Up;
    if (change < 0) return StatsTrend.Down;
    return StatsTrend.Neutral;
  };
  
  