import { EventListContainer } from "@/components/events/EventListContainer";
import { EventListItem } from "@/components/events/EventListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllEvents } from "@/utils/api";

export const revalidate = 0;

export default async function AllEvents() {
  const events = await getAllEvents();
  console.log(events);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Events</CardTitle>
      </CardHeader>
      <CardContent>
        <EventListContainer>
          {events.map((event) => (
            <EventListItem
              href={`/events/${event.id}`}
              name={event.name}
              date={
                event.dateTo
                  ? `${event.dateFrom} – ${event.dateTo}`
                  : event.dateFrom
              }
            />
          ))}
        </EventListContainer>
      </CardContent>
    </Card>
  );
}
