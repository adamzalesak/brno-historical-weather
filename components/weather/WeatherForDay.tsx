import { getWeatherForDay } from "@/utils/api";
import {
  buildSnowWidget,
  buildTemperatureWidget,
  buildWindSpeedWidget,
} from "@/components/weather/widgetBuilders";

export default async function WeatherForDay({ date }: { date: Date }) {
  let weather = null;
  try {
    weather = await getWeatherForDay(date);
  } catch (e) {
    console.error(e);
  }
  if (!weather) return null;

  const { avg_temp, precipitation, sunshine, wind_speed, snow } = weather;

  const widgetElements = [];
  if (avg_temp)
    widgetElements.push(
      buildTemperatureWidget(avg_temp, precipitation ?? 0, sunshine ?? 0),
    );

  if (wind_speed && wind_speed > 0) {
    widgetElements.push(buildWindSpeedWidget(wind_speed));
  }

  if (snow && snow > 0) widgetElements.push(buildSnowWidget(snow));

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {widgetElements.map((widgetElement, index) => (
          <div key={index} className={"col-span-1"}>
            {widgetElement}
          </div>
        ))}
      </div>
    </div>
  );
}
