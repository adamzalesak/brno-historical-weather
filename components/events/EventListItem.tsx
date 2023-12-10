import Link from "next/link";
import { Badge } from "../ui/badge";

type EventListItemProps = {
  date: string;
  name: string;
  href: string;
  isPrivate?: boolean;
};

export const EventListItem = ({
  date,
  name,
  href,
  isPrivate,
}: EventListItemProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col sm:flex-row gap-1 sm:gap-2 bg-card p-4 rounded-lg border text-card-foreground shadow-sm"
    >
      <Badge className="self-start">{date}</Badge>
      <span>{name}</span>
      {isPrivate && <Badge className="ml-auto">Private</Badge>}
    </Link>
  );
};
