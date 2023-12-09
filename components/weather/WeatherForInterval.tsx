export default async function WeatherForInterval({
  dateFrom,
  dateTo,
}: {
  dateFrom: Date;
  dateTo: Date;
}) {
  // const weather = await getWeatherForInterval(dateFrom, dateTo);
  // if (!weather) {
  //   return null;
  // }
  console.log("INTERVAL WEATHER");
  // console.log(weather);
  return <h1>INTERVAL</h1>;
}
