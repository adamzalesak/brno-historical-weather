import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { removeFromFavoriteEvents } from "@/utils/api";
import { redirect } from "next/navigation";
import { CalendarX } from "lucide-react";

type EventListItemProps = {
  id: number;
  date: string;
  name: string;
  href: string;
};

export const FavoriteEventListItem = ({
  id,
  date,
  name,
  href,
}: EventListItemProps) => {
  return (
    <div className="flex">
      <Link
        href={href}
        className="w-full flex flex-col sm:flex-row gap-1 sm:gap-2 bg-card p-4 rounded-lg border text-card-foreground shadow-sm"
      >
        <Badge className="self-start">{date}</Badge>
        <span>{name}</span>
      </Link>
      <form
        action={async () => {
          "use server";
          await removeFromFavoriteEvents(id);
          redirect("/my-events");
        }}
      >
        <Button variant="outline" className="min-h-full">
          <CalendarX className="mr-2 h-4 w-4" />
          Remove
        </Button>
      </form>
    </div>
  );
};
