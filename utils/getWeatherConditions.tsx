import { PiCloud, PiCloudSun, PiSun, PiWindLight } from "react-icons/pi";
import { IoRainySharp, IoThunderstorm } from "react-icons/io5";
import React from "react";

type WeatherCondition =
  | "Sunny"
  | "Rainy"
  | "Cloudy"
  | "Light Breeze"
  | "Partly Cloudy"
  | "Stormy"
  | "Clear";

export function determineWeatherCondition(
  precipitation: number,
  sunshine: number,
): WeatherCondition {
  if (precipitation > 5) {
    return "Stormy";
  } else if (precipitation > 0.5) {
    return "Rainy";
  } else if (precipitation > 0 && sunshine < 3) {
    return "Cloudy";
  } else if (precipitation === 0 && sunshine > 5) {
    return "Sunny";
  } else if (sunshine > 3 && sunshine <= 5) {
    return "Partly Cloudy";
  } else if (sunshine <= 3) {
    return "Light Breeze";
  } else {
    return "Clear";
  }
}

export function determineWeatherIcon(
  precipitation: number,
  sunshine: number,
): React.ReactElement {
  const weatherCondition = determineWeatherCondition(precipitation, sunshine);
  switch (weatherCondition) {
    case "Sunny":
      return <PiSun />;
    case "Rainy":
      return <IoRainySharp />;
    case "Cloudy":
      return <PiCloud />;
    case "Light Breeze":
      return <PiWindLight />;
    case "Partly Cloudy":
      return <PiCloudSun />;
    case "Stormy":
      return <IoThunderstorm />;
    case "Clear":
      return <PiSun />;
    default:
      return <PiSun />;
  }
}
