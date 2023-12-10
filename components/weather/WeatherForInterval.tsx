import { determineWindConditions } from "@/utils/getWindConditions";
import { WeatherWidget } from "@/components/weather/WeatherWidget";
import { MdOutlineWbSunny } from "react-icons/md";
import { getWeatherForInterval } from "@/utils/api";
import WeatherIntervalWidget from "@/components/weather/WeatherIntervalWidget";

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
  return (
    <div>
      <WeatherWidget
        titleText={`${Math.round(1)} km/h`}
        icon={<MdOutlineWbSunny />}
        footerText={determineWindConditions(1)}
      />
      <WeatherIntervalWidget weather={weather} />
    </div>
  );
}
