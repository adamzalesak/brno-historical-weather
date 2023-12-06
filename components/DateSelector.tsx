"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

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
  return (
    <Card>
      <CardContent>
        <DatePicker className={"pt-8"} />
        <DatePickersDivider />
        <DatePickerWithRange />
      </CardContent>
      <CardFooter>
        <Button className={"w-full"} variant={"default"}>
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DateSelector;
