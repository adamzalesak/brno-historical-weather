import { getWeatherForInterval } from "@/utils/api";
import WeatherIntervalWidget from "@/components/weather/WeatherIntervalWidget";
import { getWeatherIntervalSummary } from "@/utils/getWeatherIntervalSummary";
import {
  buildAvgPrecipitationWidget,
  buildAvgTemperatureWidget,
  buildRainyDaysCountWidget,
  buildSunnyDaysCountWidget,
} from "@/components/weather/widgetBuilders";

export default async function WeatherForInterval({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) {
  let weather = null;
  try {
    weather = await getWeatherForInterval(dateFrom, dateTo);
  } catch (e) {
    console.error(e);
  }
  if (!weather || weather.length === 0) {
    return null; // TODO card no weather data
  }
  const {
    numberOfSunnyDays,
    numberOfRainyDays,
    avgTemperature,
    avgPrecipitation,
  } = getWeatherIntervalSummary(weather);

  return (
    <div className="grid grid-cols-2 gap-4 w-auto">
      <div className="grid grid-cols-2 gap-4 w-auto">
        {buildSunnyDaysCountWidget(numberOfSunnyDays)}
        {buildRainyDaysCountWidget(numberOfRainyDays)}
        {buildAvgTemperatureWidget(avgTemperature)}
        {buildAvgPrecipitationWidget(avgPrecipitation)}
      </div>
      <WeatherIntervalWidget weather={weather} />
    </div>
  );
}
