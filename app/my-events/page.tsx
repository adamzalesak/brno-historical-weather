import { EventListContainer } from "@/components/events/EventListContainer";
import { EventListItem } from "@/components/events/EventListItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyEvents } from "@/utils/api";
import Link from "next/link";

export const revalidate = 0;

export default async function MyEvents() {
  const events = await getMyEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Events</CardTitle>
      </CardHeader>
      <CardContent>
        <EventListContainer>
          {events.map((event) => (
            <EventListItem
              key={event.id}
              href={`/events/${event.id}`}
              name={event.name}
              date={
                event.dateTo
                  ? `${event.dateFrom} – ${event.dateTo}`
                  : event.dateFrom
              }
              isPrivate={event.visibility === "Private"}
            />
          ))}
        </EventListContainer>
        <div className="mt-4 flex justify-end">
          <Button asChild>
            <Link href="/create-event">Create Event</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
