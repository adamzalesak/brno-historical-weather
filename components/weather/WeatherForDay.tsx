import { getWeatherForDay } from "@/utils/api";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { MdOutlineWbSunny } from "react-icons/md";

export default async function WeatherForDay({ date }: { date: Date }) {
  const weather = await getWeatherForDay(date);
  if (!weather) {
    return null;
  }
  console.log("SINGLE DAY WEATHER");
  console.log(weather);
  const temp = weather.max_temp ?? 0;
  return (
    <WeatherWidget
      titleText={`${Math.round(temp)}°C`}
      icon={<MdOutlineWbSunny color={"white"} />}
      footerText={"sunny"}
    />
  );
}
