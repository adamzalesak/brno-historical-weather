import { supabase } from "./supabase/client";
import { EventListItem, EventDetail } from "./models";

export const getAllEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo");
  if (error) throw error;
  return data as EventListItem[];
};

export const getEventDetail = async (id: number) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as EventDetail;
};
