import { Database } from "@/types/supabase";

export type EventCreate = Database["public"]["Tables"]["events"]["Insert"];

export type WeatherRow = Database["public"]["Tables"]["weather"]["Row"];
