import React from "react";

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
    <div className=" w-[190px] h-[268px] bg-primary rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
          <div className="flex-grow-0 text-[55px] font-medium leading-[30px] text-white p-2">
            {titleText}
          </div>
          <div className="flex-grow flex justify-center items-center p-2 text-[100px] text-white">
            {icon}
          </div>
          <div className="flex-grow-0 text-[50px] font-medium leading-[30px] text-white p-2">
            {footerText}
          </div>
        </div>
      </div>
    </div>
  );
};
