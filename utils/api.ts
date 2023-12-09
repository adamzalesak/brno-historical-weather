import { createClient } from "./supabase/server";

export const getAllEvents = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo");
  if (error) throw error;
  return data;
};

export const getEventDetail = async (id: number) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};
