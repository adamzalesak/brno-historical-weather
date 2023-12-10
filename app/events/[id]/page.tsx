import { getEventDetail } from "@/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDates } from "@/utils/formatDates";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarHeart } from "lucide-react";
import { NotFound } from "@/components/NotFound";
import Weather from "@/components/Weather";

export default async function EventDetail({
  params,
}: {
  params: { id: number };
}) {
  let event = null;
  try {
    event = await getEventDetail(params.id);
  } catch (e) {
    console.error(e);
  }

  if (!event) {
    return <NotFound />;
  }

  return (
    <div className={"grid grid-cols-5 gap-4"}>
      <Card className={"col-span-3 "}>
        <CardHeader>
          <CardTitle>
            <div className={"flex justify-between"}>
              {event.name}
              <Button variant="outline">
                <CalendarHeart className="mr-2 h-4 w-4" />
                Add to favorites
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {formatDates(event.dateFrom, event.dateTo)}
          </CardDescription>
        </CardHeader>
        <CardContent>{event.description}</CardContent>
        {event.link !== null && event.link !== "" && (
          <CardFooter className={"justify-end"}>
            <Link href={event.link}>
              <Button variant="link">Learn more</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
      <div className={"col-span-2"}>
        <Weather dateFrom={event.dateFrom} dateTo={event.dateTo} />
      </div>
    </div>
  );
}
