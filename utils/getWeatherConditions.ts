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
