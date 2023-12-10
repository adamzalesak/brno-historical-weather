import { WeatherWidget } from "@/components/weather/WeatherWidget";
import {
  determineWeatherCondition,
  determineWeatherIcon,
} from "@/utils/getWeatherConditions";
import {
  determineWindConditions,
  determineWindIcon,
} from "@/utils/getWindConditions";
import { IoRainySharp, IoSnowOutline } from "react-icons/io5";
import { PiSun } from "react-icons/pi";
import React from "react";
import { FaTemperatureEmpty } from "react-icons/fa6";
import { GiHeavyRain } from "react-icons/gi";

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

export function buildAvgTemperatureWidget(avg_temp: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(avg_temp)}°C`}
      icon={<FaTemperatureEmpty />}
      footerText={"Average Temperature"}
    />
  );
}

export function buildSunnyDaysCountWidget(sunnyDaysCount: number) {
  if (sunnyDaysCount === 0) return null;
  return (
    <WeatherWidget
      titleText={`${Math.round(sunnyDaysCount)}`}
      icon={<PiSun />}
      footerText={"Sunny Days"}
    />
  );
}

export function buildRainyDaysCountWidget(rainyDaysCount: number) {
  if (rainyDaysCount === 0) return null;
  return (
    <WeatherWidget
      titleText={`${Math.round(rainyDaysCount)}`}
      icon={<IoRainySharp />}
      footerText={"Rainy Days"}
    />
  );
}

export function buildAvgPrecipitationWidget(avg_precipitation: number) {
  return (
    <WeatherWidget
      titleText={`${Math.round(avg_precipitation)} mm`}
      icon={<GiHeavyRain />}
      footerText={"Average Precipitation"}
    />
  );
}
