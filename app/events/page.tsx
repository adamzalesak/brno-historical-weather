import { EventListContainer } from "@/components/events/EventListContainer";
import { EventListItem } from "@/components/events/EventListItem";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function Events() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Events</CardTitle>
      </CardHeader>
      <CardContent>
        <EventListContainer>
          <EventListItem
            href="/events/1"
            name="Pope Benedict XVI visits Brno"
            date="27. 9. 2009"
          />
          <EventListItem
            href="/events/2"
            name="Pope Benedict XVI visits Brno"
            date="27. 9. 2009"
          />
          <EventListItem
            href="/events/3"
            name="Pope Benedict XVI visits Brno"
            date="27. 9. 2009"
          />
        </EventListContainer>
      </CardContent>
    </Card>
  );
}
