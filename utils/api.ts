import { createClient } from "./supabase/server";

export const getPublicEvents = async () => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo, visibility")
    .eq("visibility", "Public");
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

export const getMyFavoriteEventsIds = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) throw new Error("User not found");

  const { data, error } = await supabase
    .from("favorite_events")
    .select("event_id")
    .eq("user_id", userId);
  if (error) throw error;
  return data?.map((favorite: any) => favorite.event_id);
};
export const getMyFavoriteEvents = async () => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) throw new Error("User not found");

  const { data, error } = await supabase
    .from("events")
    .select("id, name, dateFrom, dateTo, visibility")
    .in("id", await getMyFavoriteEventsIds());
  if (error) throw error;
  return data;
};

export const removeFromFavoriteEvents = async (eventId: number) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) throw new Error("User not found");

  const { error } = await supabase
    .from("favorite_events")
    .delete()
    .eq("user_id", userId)
    .eq("event_id", eventId);
  if (error) throw error;
};

export const getIsMyFavoriteEvent = async (eventId: number) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    return false;
  }

  const { data, error } = await supabase
    .from("favorite_events")
    .select("event_id")
    .eq("user_id", userId)
    .eq("event_id", eventId);
  if (error) throw error;
  return data?.length > 0;
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
    .eq("date", date.toISOString());

  if (error) throw error;
  if (!data.length) return null;

  return data[0];
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
