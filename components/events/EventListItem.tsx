import Link from "next/link";
import { Badge } from "../ui/badge";

type EventListItemProps = {
  date: string;
  name: string;
  href: string;
};

export const EventListItem = ({ date, name, href }: EventListItemProps) => {
  return (
    <Link
      href={href}
      className="flex gap-2 bg-card p-4 rounded-lg border text-card-foreground shadow-sm"
    >
      <Badge className="flex items-center gap-2">{date}</Badge>
      <span>{name}</span>
    </Link>
  );
};
