import { createClient } from "./supabase/server";

export const getAllEvents = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo, visibility")
    .or(`visibility.eq.Public${userId ? `,owner_uuid.eq.${userId}` : ""}`);
  if (error) throw error;
  return data;
};

export const getMyEvents = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) throw new Error("User not found");

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo, visibility")
    .eq("owner_uuid", userId);
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

export const getWeatherForDay = async (date: Date) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("weather")
    .select("*")
    .eq("date", date.toISOString())
    .single();
  if (error) throw error;
  return data;
};

export const getWeatherForInterval = async (dateFrom: Date, dateTo: Date) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("weather")
    .select("*")
    .gte("date", dateFrom.toISOString())
    .lte("date", dateTo.toISOString());
  if (error) throw error;
  return data;
};
