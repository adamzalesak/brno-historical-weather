import { getWeatherForDay } from "@/utils/api";

export default async function WeatherForDay({ date }: { date: Date }) {
  const weather = await getWeatherForDay(date);
  if (!weather) {
    return null;
  }
  console.log("SINGLE DAY WEATHER");
  console.log(weather);
  return <h1>Single DAY</h1>;
}
