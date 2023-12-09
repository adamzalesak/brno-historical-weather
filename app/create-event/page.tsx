"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { newEventSchema } from "@/lib/formSchema";
import { RadioGroupField } from "@/components/formFields/RadioGroupField";
import { TextareaField } from "@/components/formFields/TextAreaField";
import { TextInputField } from "@/components/formFields/TextInputField";

import React from "react";
import { Database } from "@/types/supabase";
import { DatePickerField } from "@/components/formFields/DatePickerField";
import { Switch } from "@/components/ui/switch";

type NewEvent = Database["public"]["Tables"]["events"]["Insert"];

const CreateEvent = () => {
  // const supabase = createClient();

  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: "",
      description: "",
      linkWithMoreInfo: "",
      visibility: "Public",
    },
  });

  function onSubmit(values: z.infer<typeof newEventSchema>) {
    console.log("submitting");
    const createdAt = new Date().toISOString();
    // const user = supabase.auth.getUser();
    // if (!user) {
    //   throw new Error("User is not logged in");
    // }
    // console.log(user);

    const newEvent: NewEvent = {
      created_at: createdAt,
      name: values.name,
      description: values.description,
      link: values.linkWithMoreInfo ?? null,
      owner_uuid: "admin-test-uuid",
      visibility: values.visibility,
    };
    // supabase.from("events").insert([
    //   {
    //     created_at: createdAt,
    //     name: values.name,
    //     description: values.description,
    //     link: values.linkWithMoreInfo,
    //   },
    // ]);
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

              {/*switch if event is single date or two dates from and to*/}
              <FormField
                control={form.control}
                name="singleDayEvent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Marketing emails
                      </FormLabel>
                      <FormDescription>
                        Receive emails about new products, features, and more.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"dateFrom"}
                render={({ field }) => (
                  <DatePickerField field={field} label={"Date of event"} />
                )}
              />
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
