"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { newEventSchema } from "@/lib/formSchema";
import {
  FormInputField,
  FormRadioGroupField,
  FormTextareaField,
} from "@/components/FormParts";
import { createClient } from "@/utils/supabase/client";

const CreateEvent = () => {
  const supabase = createClient();

  const form = useForm<z.infer<typeof newEventSchema>>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      name: "",
      description: "",
      linkWithMoreInfo: "",
      visibility: "public",
    },
  });

  function onSubmit(values: z.infer<typeof newEventSchema>) {
    const createdAt = new Date().toISOString();
    const user = supabase.auth.getUser();
    supabase.from("events").insert({
      created_at: createdAt,
      name: values.name,
      description: values.description,
      link: values.linkWithMoreInfo,
    });

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
              <FormInputField control={form.control} name="name" label="Name" />
              <FormTextareaField
                control={form.control}
                name="description"
                label="Description"
              />
              <FormInputField
                control={form.control}
                name={"linkWithMoreInfo"}
                label={"Link with more info (optional)"}
              />
              <FormRadioGroupField
                control={form.control}
                name="visibility"
                label="Visibility"
                options={[
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                ]}
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
