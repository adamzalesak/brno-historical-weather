"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeatherRow } from "@/types/supabaseAbstractions";
import { simplifyWeatherData } from "@/utils/reduceLargeIntervalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherIntervalWidgetProps {
  weather: WeatherRow[];
}

export default function WeatherIntervalWidget({
  weather,
}: WeatherIntervalWidgetProps) {
  const filteredWeather = simplifyWeatherData(weather);
  console.log(filteredWeather);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={filteredWeather}>
            <XAxis
              dataKey="intervalFromDate"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={true}
            />
            <YAxis
              stroke="#888888"
              fontSize={20}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} °C`}
            />
            <Tooltip
              labelFormatter={(value) => `${value}`}
              formatter={(value) =>
                `${Math.round(Number(value) * 100) / 100} °C`
              }
            />
            <Bar
              dataKey="avgTemperature"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
