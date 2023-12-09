import { FormItem, FormLabel } from "@/components/ui/form";
import React from "react";

import { DatePicker } from "@/components/ui/date-picker";

export const DatePickerField = ({
  label,
  field,
}: {
  label: string;
  field: any;
}) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <DatePicker selectedDate={field.value} onDateChange={field.onChange} />
    </FormItem>
  );
};
