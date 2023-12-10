"use client";

import { Weather } from "@/types/custom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface WeatherIntervalWidgetProps {
  weather: Weather[];
}

export default async function WeatherIntervalWidget({
  weather,
}: WeatherIntervalWidgetProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={weather}>
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
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="air_moisture" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
