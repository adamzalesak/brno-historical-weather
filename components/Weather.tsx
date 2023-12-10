import WeatherForDay from "@/components/weather/WeatherForDay";
import WeatherForInterval from "@/components/weather/WeatherForInterval";

interface WeatherParams {
  dateFrom: string;
  dateTo?: string | null;
}

export default async function Weather({ dateFrom, dateTo }: WeatherParams) {
  const from = new Date(dateFrom);
  if (!dateTo) {
    return <WeatherForDay date={from} />;
  }
  const to = new Date(dateTo);
  return <WeatherForInterval dateFrom={from} dateTo={to} />;
}
