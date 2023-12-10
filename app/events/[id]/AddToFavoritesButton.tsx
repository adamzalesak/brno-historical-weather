"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { CalendarHeart, CalendarX } from "lucide-react";
import React from "react";

export const AddToFavoritesButton = ({
  id,
  isMyFavorite,
  revalidateCache,
}: {
  id: number;
  isMyFavorite: boolean;
  revalidateCache: () => void;
}) => {
  const { toast } = useToast();

  const [isFavorite, setIsFavorite] = React.useState(isMyFavorite);

  const addToFavorites = async (eventId: number) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      toast({
        title: "You need to be logged in to add an event to favorites",
      });
      return;
    }

    const { error } = await supabase
      .from("favorite_events")
      .insert([{ event_id: eventId, user_id: userId }]);
    if (error) {
      toast({ title: "Something went wrong" });
    }

    setIsFavorite(true);
    toast({ title: "Event added to favorites" });
    revalidateCache();
  };

  const removeFromFavorites = async (eventId: number) => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) {
      toast({
        title: "You need to be logged in to add an event to favorites",
      });
      return;
    }

    const { error } = await supabase
      .from("favorite_events")
      .delete()
      .match({ event_id: eventId, user_id: userId });
    if (error) {
      toast({ title: "Something went wrong" });
    }

    setIsFavorite(false);
    toast({ title: "Event removed from favorites" });
    revalidateCache();
  };

  if (isFavorite) {
    return (
      <Button variant="outline" onClick={() => removeFromFavorites(id)}>
        <CalendarX className="mr-2 h-4 w-4" />
        Remove from favorites
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={() => addToFavorites(id)}>
      <CalendarHeart className="mr-2 h-4 w-4" />
      Add to favorites
    </Button>
  );
};
