"use client";

import { DatePickerField } from "@/components/formFields/DatePickerField";
import { RadioGroupField } from "@/components/formFields/RadioGroupField";
import { SwitchField } from "@/components/formFields/SwitchField";
import { TextareaField } from "@/components/formFields/TextAreaField";
import { TextInputField } from "@/components/formFields/TextInputField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { newEventSchema } from "@/lib/formSchema";
import { EventCreate } from "@/types/supabaseAbstractions";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateEvent = ({
  searchParams: { dateFrom, dateTo },
}: {
  searchParams: {
    dateFrom?: string;
    dateTo?: string;
  };
}) => {
  const router = useRouter();
  const supabase = createClient();
  const { toast } = useToast();

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

  // set initial values from query params
  useEffect(() => {
    if (!dateFrom && !dateTo) {
      return;
    }

    if (dateFrom && !dateTo) {
      form.setValue("isSingleDayEvent", true);
      const from = new Date(dateFrom);
      form.setValue("dateFrom", from);
    }

    if (dateFrom && dateTo) {
      form.setValue("isSingleDayEvent", false);
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      form.setValue("dateFrom", from);
      form.setValue("dateTo", to);
    }
  }, [dateFrom, dateTo]);

  const isSingleDayEvent = form.watch("isSingleDayEvent");
  const dateFromValue = form.watch("dateFrom");
  const dateToValue = form.watch("dateTo");

  useEffect(() => {
    if (isSingleDayEvent && dateFromValue && !dateToValue) {
      form.setValue("dateTo", dateFromValue);
    }
  }, [isSingleDayEvent, dateFromValue, dateToValue]);

  function onSubmit(values: z.infer<typeof newEventSchema>) {
    supabase.auth.getUser().then((response) => {
      const { user } = response.data;
      if (!user) {
        throw new Error("User is not logged in");
      }

      const newEvent: EventCreate = {
        name: values.name,
        description: values.description,
        link: values.linkWithMoreInfo ?? null,
        owner_uuid: user.id,
        visibility: values.visibility,
        dateFrom: format(values.dateFrom, "yyyy-MM-dd"),
        dateTo: values.isSingleDayEvent
          ? null
          : format(values.dateTo, "yyyy-MM-dd"),
      };

      supabase
        .from("events")
        .insert(newEvent)
        .select("id")
        .then((r) => {
          toast({ title: "Event created successfully" });
          router.push(`/events/${r.data?.[0].id}`);
        });
    });
  }

  return (
    <Card className={"max-w-xl"}>
      <CardHeader>
        <CardTitle>Create My Event</CardTitle>
        <CardDescription>Edit your event's attributes</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <TextInputField label="Event name" field={field} />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <TextareaField field={field} label="Description" />
              )}
            />
            <FormField
              control={form.control}
              name="linkWithMoreInfo"
              render={({ field }) => (
                <TextInputField
                  field={field}
                  label="Link with more info (optional)"
                />
              )}
            />
            <FormField
              control={form.control}
              name="isSingleDayEvent"
              render={({ field }) => (
                <SwitchField field={field} label="Single day event" />
              )}
            />
            <FormField
              control={form.control}
              name="dateFrom"
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
                name="dateTo"
                render={({ field }) => (
                  <DatePickerField field={field} label="To" />
                )}
              />
            )}
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <RadioGroupField
                  field={field}
                  label="Visibility"
                  options={[
                    { value: "Public", label: "Public" },
                    { value: "Private", label: "Private" },
                  ]}
                />
              )}
            />
            <Button type="submit" className="mt-8">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CreateEvent;
