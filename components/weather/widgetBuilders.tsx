import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { MdOutlineWbSunny } from "react-icons/md";
import { determineWeatherCondition } from "@/utils/getWeatherConditions";
import { determineWindConditions } from "@/utils/getWindConditions";

export function buildTemperatureWidget(
  avg_temp: number,
  precipitation: number,
  sunshine: number,
) {
  return (
    <WeatherWidget
      titleText={`${Math.round(avg_temp)}°C`}
      icon={<MdOutlineWbSunny />} // Replace with appropriate icon
      footerText={determineWeatherCondition(precipitation, sunshine)}
    />
  );
}

export function buildWindSpeedWidget(wind_speed: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(wind_speed)} km/h`}
      icon={<MdOutlineWbSunny />} // Replace with appropriate icon
      footerText={determineWindConditions(wind_speed)}
    />
  );
}

export function buildSnowWidget(snow: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(snow)} cm`}
      icon={<MdOutlineWbSunny />} // Replace with appropriate icon
      footerText="Snow"
    />
  );
}
