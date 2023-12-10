import { WeatherWidget } from "@/components/weather/WeatherWidget";
import {
  determineWeatherCondition,
  determineWeatherIcon,
} from "@/utils/getWeatherConditions";
import {
  determineWindConditions,
  determineWindIcon,
} from "@/utils/getWindConditions";
import { IoSnowOutline } from "react-icons/io5";

export function buildTemperatureWidget(
  avg_temp: number,
  precipitation: number,
  sunshine: number,
) {
  return (
    <WeatherWidget
      titleText={`${Math.round(avg_temp)}°C`}
      icon={determineWeatherIcon(precipitation, sunshine)}
      footerText={determineWeatherCondition(precipitation, sunshine)}
    />
  );
}

export function buildWindSpeedWidget(wind_speed: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(wind_speed)} km/h`}
      icon={determineWindIcon(wind_speed)}
      footerText={determineWindConditions(wind_speed)}
    />
  );
}

export function buildSnowWidget(snow: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(snow)} cm`}
      icon={<IoSnowOutline />}
      footerText="Snow"
    />
  );
}
