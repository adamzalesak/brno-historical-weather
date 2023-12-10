"use client";
import { RadioGroupField } from "@/components/formFields/RadioGroupField";
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
import { newEventSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { DatePickerField } from "@/components/formFields/DatePickerField";
import { SwitchField } from "@/components/formFields/SwitchField";
import { EventCreate } from "@/types/supabaseAbstractions";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const CreateEvent = () => {
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

  const isSingleDayEvent = form.watch("isSingleDayEvent");
  useEffect(() => {
    if (isSingleDayEvent) {
      form.setValue("dateTo", form.getValues("dateFrom"));
    }
  }, [isSingleDayEvent, form.getValues("dateFrom")]);

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
        dateFrom: values.dateFrom.toISOString(),
        dateTo: values.isSingleDayEvent ? null : values.dateTo.toISOString(),
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
