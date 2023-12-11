import { EventListContainer } from "@/components/events/EventListContainer";
import { EventListItem } from "@/components/events/EventListItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicEvents } from "@/utils/api";
import { formatDates } from "@/utils/formatDates";

export const revalidate = 0;

export default async function PublicEvents() {
  const events = await getPublicEvents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Events</CardTitle>
      </CardHeader>
      <CardContent>
        <EventListContainer>
          {events.map((event) => (
            <EventListItem
              key={event.id}
              href={`/events/${event.id}`}
              name={event.name}
              date={formatDates(event.dateFrom, event.dateTo)}
            />
          ))}
        </EventListContainer>
      </CardContent>
    </Card>
  );
}
