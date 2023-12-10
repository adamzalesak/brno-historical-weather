"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { WeatherRow } from "@/types/supabaseAbstractions";

interface WeatherIntervalWidgetProps {
  weather: WeatherRow[];
}

export default function WeatherIntervalWidget({
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
        <Bar dataKey="avg_temp" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
