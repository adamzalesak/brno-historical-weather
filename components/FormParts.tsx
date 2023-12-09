import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";

interface FormInputFieldProps {
  control: any;
  name: string;
  label: string;
}

const FormInputField: React.FC<FormInputFieldProps> = ({
  control,
  name,
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormTextareaFieldProps {
  control: any;
  name: string;
  label: string;
}

const FormTextareaField: React.FC<FormTextareaFieldProps> = ({
  control,
  name,
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FormRadioGroupFieldProps {
  control: any;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

const FormRadioGroupField: React.FC<FormRadioGroupFieldProps> = ({
  control,
  name,
  label,
  options,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1 "
            >
              {options.map((option, index) => (
                <FormItem
                  key={index}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { FormInputField, FormTextareaField, FormRadioGroupField };
