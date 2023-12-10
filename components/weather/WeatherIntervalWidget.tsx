"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { WeatherRow } from "@/types/supabaseAbstractions";
import { simplifyWeatherData } from "@/utils/reduceLargeIntervalData";

interface WeatherIntervalWidgetProps {
  weather: WeatherRow[];
}

export default function WeatherIntervalWidget({
  weather,
}: WeatherIntervalWidgetProps) {
  const filteredWeather = simplifyWeatherData(weather);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={filteredWeather}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value} °C`}
        />
        <Bar
          dataKey="avgTemperature"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
