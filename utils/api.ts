import { cookies } from "next/headers";
import { EventDetail, EventListItem } from "./models";
import { createClient } from "./supabase/server";

export const getAllEvents = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo");
  if (error) throw error;
  return data as EventListItem[];
};

export const getEventDetail = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as EventDetail;
};
