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
  const weather = await getWeatherForInterval(dateFrom, dateTo);
  if (!weather) {
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

        <WeatherIntervalWidget weather={weather} />
      </div>
    </div>
  );
}
