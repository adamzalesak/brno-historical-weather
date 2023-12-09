import { FormField, FormItem, FormLabel } from "@/components/ui/form";

type DatePickerFieldProps = {
  control: any;
  name: string;
  label: string;
};

import React from "react";

import { DatePicker } from "@/components/ui/date-picker";

export const DatePickerField: React.FunctionComponent<DatePickerFieldProps> = ({
  control,
  name,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date of event</FormLabel>
        <DatePicker selectedDate={field.value} onDateChange={field.onChange} />
      </FormItem>
    )}
  />
);
