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

import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";
import { RadioGroupField } from "@/components/formFields/RadioGroupField";
import { TextareaField } from "@/components/formFields/TextAreaField";
import { TextInputField } from "@/components/formFields/TextInputField";

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
    },
  });

  function onSubmit(values: z.infer<typeof newEventSchema>) {
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
              <TextInputField control={form.control} name="name" label="Name" />
              <TextareaField
                control={form.control}
                name="description"
                label="Description"
              />
              <TextInputField
                control={form.control}
                name={"linkWithMoreInfo"}
                label={"Link with more info (optional)"}
              />
              <RadioGroupField
                control={form.control}
                name="visibility"
                label="Visibility"
                options={[
                  { value: "Public", label: "Public" },
                  { value: "Private", label: "Private" },
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
