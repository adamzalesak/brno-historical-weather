import { WeatherRow } from "@/types/supabaseAbstractions";
import { WeatherIntervalSummary } from "@/types/custom";
import { getWeatherIntervalSummary } from "@/utils/getWeatherIntervalSummary";

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date.getTime() - startOfYear.getTime()) / 86400000;
  return Math.ceil((pastDays + startOfYear.getDay() + 1) / 7);
}

function groupDataByPeriod(
  data: WeatherRow[],
  period: "week" | "month" | "year",
): WeatherRow[][] {
  const groups: WeatherRow[][] = [];
  let currentGroup: WeatherRow[] = [];
  let currentPeriod = -1;

  data.forEach((row) => {
    const date = new Date(row.date);
    let periodIndex: number;

    switch (period) {
      case "week":
        periodIndex = getWeekNumber(date);
        break;
      case "month":
        periodIndex = date.getMonth();
        break;
      case "year":
        periodIndex = date.getFullYear();
        break;
    }

    if (currentPeriod !== periodIndex) {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = [row];
      currentPeriod = periodIndex;
    } else {
      currentGroup.push(row);
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}
export const simplifyWeatherData = (
  weather: WeatherRow[],
): WeatherIntervalSummary[] => {
  const interval =
    weather.length > 1000
      ? "year"
      : weather.length > 100
        ? "month"
        : weather.length > 30
          ? "week"
          : "day";

  // take all elements for whole week/month/year and average them
  const simplifiedWeather: WeatherIntervalSummary[] = [];

  if (interval === "day") {
    weather.forEach((row) => {
      simplifiedWeather.push(getWeatherIntervalSummary([row]));
    });
    return simplifiedWeather;
  }

  const groupData = groupDataByPeriod(weather, interval);
  groupData.forEach((group) => {
    simplifiedWeather.push(getWeatherIntervalSummary(group));
  });

  return simplifiedWeather;
};
