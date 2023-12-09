"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { newEventSchema } from "@/lib/formSchema";
import { RadioGroupField } from "@/components/formFields/RadioGroupField";
import { TextareaField } from "@/components/formFields/TextAreaField";
import { TextInputField } from "@/components/formFields/TextInputField";

import React, { useEffect } from "react";
import { Database } from "@/types/supabase";
import { DatePickerField } from "@/components/formFields/DatePickerField";
import { SwitchField } from "@/components/formFields/SwitchField";
import { createClient } from "@/utils/supabase/client";

type NewEvent = Database["public"]["Tables"]["events"]["Insert"];

const CreateEvent = () => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: "",
      description: "",
      linkWithMoreInfo: "",
      visibility: "Public",
      isSingleDayEvent: true,
    },
  });

  const isSingleDayEvent = form.watch("isSingleDayEvent");
  useEffect(() => {
    if (isSingleDayEvent) {
      form.setValue("dateTo", form.getValues("dateFrom"));
    }
  }, [isSingleDayEvent, form.getValues("dateFrom")]);

  function onSubmit(values: z.infer<typeof newEventSchema>) {
    console.log("submitting");
    const createdAt = new Date().toISOString();
    const user = supabase.auth.getUser();
    if (!user) {
      throw new Error("User is not logged in");
    }
    console.log(user);

    const newEvent: NewEvent = {
      created_at: createdAt,
      name: values.name,
      description: values.description,
      link: values.linkWithMoreInfo ?? null,
      owner_uuid: "admin-test-uuid",
      visibility: values.visibility,
    };
    supabase
      .from("events")
      .insert(newEvent)
      .then((r) => console.log(r));
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create my event</CardTitle>
        <CardDescription>Edit your event's attributes</CardDescription>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <TextInputField label={"Event name"} field={field} />
                )}
              />
              <FormField
                control={form.control}
                name={"description"}
                render={({ field }) => (
                  <TextareaField field={field} label="Description" />
                )}
              />
              <FormField
                control={form.control}
                name={"linkWithMoreInfo"}
                render={({ field }) => (
                  <TextInputField
                    field={field}
                    label={"Link with more info (optional)"}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="isSingleDayEvent"
                render={({ field }) => (
                  <SwitchField field={field} label={"Single day event"} />
                )}
              />
              <FormField
                control={form.control}
                name={"dateFrom"}
                render={({ field }) => (
                  <DatePickerField
                    field={field}
                    label={isSingleDayEvent ? "Date of event" : "From"}
                  />
                )}
              />
              {!isSingleDayEvent && (
                <FormField
                  control={form.control}
                  name={"dateTo"}
                  render={({ field }) => (
                    <DatePickerField field={field} label={"To"} />
                  )}
                />
              )}
              <FormField
                control={form.control}
                name={"visibility"}
                render={({ field }) => (
                  <RadioGroupField
                    field={field}
                    label={"Visibility"}
                    options={[
                      { value: "Public", label: "Public" },
                      { value: "Private", label: "Private" },
                    ]}
                  />
                )}
              />
              <Button type="submit" className={"mt-8"}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
export default CreateEvent;
