import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WeatherWidgetProps {
  titleText: string;
  icon: React.ReactElement;
  footerText: string;
}

export const WeatherWidget = ({
  titleText,
  icon,
  footerText,
}: WeatherWidgetProps) => {
  return (
    <Card className="bg-primary col-span-1">
      <CardHeader>
        <CardTitle>
          <div className="flex-grow-0 text-4xl font-medium leading-[30px] text-white text-center">
            {titleText}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center mx-1 ">
          <div className="flex-grow flex justify-center items-center text-[100px] text-white">
            {icon}
          </div>
          <div className="text-2xl font-medium align-middle text-white text-center">
            {footerText}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
