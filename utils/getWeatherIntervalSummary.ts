import { WeatherRow } from "@/types/supabaseAbstractions";
import { WeatherIntervalSummary } from "@/types/custom";

export const getWeatherIntervalSummary = (
  weather: WeatherRow[],
): WeatherIntervalSummary => {
  let totalAirPressure = 0;
  let totalTemperature = 0;
  let totalSunshine = 0;
  let totalPrecipitation = 0;
  let totalWindSpeed = 0;
  let rainyDayCount = 0;
  let sunnyDayCount = 0;
  let countAirPressure = 0;
  let countTemperature = 0;
  let countSunshine = 0;
  let countPrecipitation = 0;
  let countWindSpeed = 0;

  weather.forEach((row) => {
    if (row.air_pressure !== null) {
      totalAirPressure += row.air_pressure;
      countAirPressure++;
    }
    if (row.avg_temp !== null) {
      totalTemperature += row.avg_temp;
      countTemperature++;
    }
    if (row.sunshine !== null) {
      totalSunshine += row.sunshine;
      countSunshine++;
      if (row.sunshine > 4) {
        sunnyDayCount++;
      }
    }
    if (row.precipitation !== null) {
      totalPrecipitation += row.precipitation;
      countPrecipitation++;
      if (row.precipitation > 1) {
        rainyDayCount++;
      }
    }
    if (row.wind_speed !== null) {
      totalWindSpeed += row.wind_speed;
      countWindSpeed++;
    }
  });

  return {
    avgAirPressure:
      countAirPressure > 0 ? totalAirPressure / countAirPressure : 0,
    avgTemperature:
      countTemperature > 0 ? totalTemperature / countTemperature : 0,
    avgSunshine: countSunshine > 0 ? totalSunshine / countSunshine : 0,
    avgPrecipitation:
      countPrecipitation > 0 ? totalPrecipitation / countPrecipitation : 0,
    avgWindSpeed: countWindSpeed > 0 ? totalWindSpeed / countWindSpeed : 0,
    numberOfRainyDays: rainyDayCount,
    numberOfSunnyDays: sunnyDayCount,
    intervalFromDate: weather[0].date,
  };
};
