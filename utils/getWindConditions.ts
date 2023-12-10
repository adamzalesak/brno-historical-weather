type WindIntensity =
  | "Calm"
  | "Light Breeze"
  | "Gentle Breeze"
  | "Moderate Breeze"
  | "Strong Wind"
  | "Storm"
  | "Violent Storm"
  | "Hurricane";

export function determineWindConditions(windSpeed: number): WindIntensity {
  if (windSpeed < 1) {
    return "Calm";
  } else if (windSpeed < 12) {
    return "Light Breeze";
  } else if (windSpeed < 20) {
    return "Gentle Breeze";
  } else if (windSpeed < 29) {
    return "Moderate Breeze";
  } else if (windSpeed < 103) {
    return "Storm";
  } else if (windSpeed < 118) {
    return "Violent Storm";
  } else {
    return "Hurricane";
  }
}
