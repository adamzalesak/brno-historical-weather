"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { DateRange } from "react-day-picker";

const DatePickersDivider = () => {
  return (
    <>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-sm text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="text-xs text-gray-500 text-center mb-4">
        select time period you are interested in
      </div>
    </>
  );
};

const DateSelector = () => {
  const router = useRouter();

  const [singleDate, setSingleDate] = React.useState<Date>();
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const formatDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const handleButtonClick = () => {
    if (singleDate) {
      router.push(`date-detail?dateFrom=${formatDate(singleDate)}`);
    } else if (dateRange?.from && dateRange?.to) {
      router.push(
        `date-detail?dateFrom=${formatDate(dateRange.from)}&dateTo=${formatDate(
          dateRange.to
        )}`
      );
    }
  };

  return (
    <Card>
      <CardContent>
        <DatePicker
          date={singleDate}
          setDate={(date) => {
            setDateRange({ from: undefined, to: undefined });
            setSingleDate(date);
          }}
          className="pt-8"
        />
        <DatePickersDivider />
        <DatePickerWithRange
          date={dateRange}
          setDate={(date) => {
            setSingleDate(undefined);
            setDateRange(date);
          }}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleButtonClick}
          disabled={!singleDate && (!dateRange?.from || !dateRange?.to)}
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DateSelector;
