import { getWeatherForDay } from "@/utils/api";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { MdOutlineWbSunny } from "react-icons/md";
import { determineWeatherCondition } from "@/utils/getWeatherConditions";
import { determineWindConditions } from "@/utils/getWindConditions";

export default async function WeatherForDay({ date }: { date: Date }) {
  const weather = await getWeatherForDay(date);
  if (!weather) {
    return null;
  }
  const { avg_temp, precipitation, sunshine, wind_speed, snow } = weather;

  const widgetData = [];
  if (avg_temp) {
    widgetData.push({
      titleText: `${Math.round(avg_temp)}°C`,
      icon: <MdOutlineWbSunny />,
      footerText: determineWeatherCondition(precipitation ?? 0, sunshine ?? 0),
    });
  }
  if (wind_speed) {
    widgetData.push({
      titleText: `${Math.round(wind_speed)} km/h`,
      icon: <MdOutlineWbSunny />,
      footerText: determineWindConditions(wind_speed ?? 0),
    });
  }
  if (snow) {
    widgetData.push({
      titleText: `${Math.round(snow)} cm`,
      icon: <MdOutlineWbSunny />,
      footerText: "snow",
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 w-auto">
        {widgetData.map((widget) => (
          <WeatherWidget
            titleText={widget.titleText}
            icon={widget.icon}
            footerText={widget.footerText}
          />
        ))}
      </div>
    </div>
  );
}
