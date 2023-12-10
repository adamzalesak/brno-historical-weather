import React from "react";
import {
  PiWindBold,
  PiWindDuotone,
  PiWindLight,
  PiWindThin,
} from "react-icons/pi";

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
export function determineWindIcon(windSpeed: number): React.ReactElement {
  const windIntensity = determineWindConditions(windSpeed);
  switch (windIntensity) {
    case "Calm":
      return <PiWindThin />;
    case "Light Breeze":
    case "Gentle Breeze":
      return <PiWindLight />;
    case "Moderate Breeze":
    case "Strong Wind":
      return <PiWindDuotone />;
    case "Storm":
    case "Violent Storm":
    case "Hurricane":
      return <PiWindBold />;
    default:
      return <PiWindThin />;
  }
}
