import { EventListContainer } from "@/components/events/EventListContainer";
import { EventListItem } from "@/components/events/EventListItem";
import { FavoriteEventListItem } from "@/components/events/FavoriteEventListItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMyEvents, getMyFavoriteEvents } from "@/utils/api";
import { formatDates } from "@/utils/formatDates";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function MyEvents() {
  const events = await getMyEvents();
  const favoriteEvents = await getMyFavoriteEvents();

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>My Events</CardTitle>
        </CardHeader>
        <CardContent>
          <EventListContainer>
            {events.length === 0 && (
              <div className="text-center text-gray-500">
                You have no events yet.
              </div>
            )}
            {events.map((event) => (
              <EventListItem
                key={event.id}
                href={`/events/${event.id}`}
                name={event.name}
                date={formatDates(event.dateFrom, event.dateTo)}
                isPublic={event.visibility === "Public"}
              />
            ))}
          </EventListContainer>
          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline">
              <Link href="/create-event">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Favorite Events</CardTitle>
        </CardHeader>
        <CardContent>
          <EventListContainer>
            {favoriteEvents.length === 0 && (
              <div className="text-center text-gray-500">
                You have no favorite events yet.
              </div>
            )}
            {favoriteEvents.map((event) => (
              <FavoriteEventListItem
                key={event.id}
                id={event.id}
                href={`/events/${event.id}`}
                name={event.name}
                date={formatDates(event.dateFrom, event.dateTo)}
              />
            ))}
          </EventListContainer>
          <div className="mt-4 flex justify-end">
            <Button asChild variant="outline">
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
