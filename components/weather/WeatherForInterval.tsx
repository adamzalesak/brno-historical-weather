import { getWeatherForInterval } from "@/utils/api";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { MdOutlineWbSunny } from "react-icons/md";
import { determineWindConditions } from "@/utils/getWindConditions";

export default async function WeatherForInterval({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) {
  const weather = await getWeatherForInterval(dateFrom, dateTo);
  if (!weather) {
    return null;
  }
  console.log("INTERVAL WEATHER");
  console.log(weather);
  return (
    <WeatherWidget
      titleText={`${Math.round(1)} km/h`}
      icon={<MdOutlineWbSunny />}
      footerText={determineWindConditions(1)}
    />
  );
}
