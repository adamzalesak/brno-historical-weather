import { getEventDetail } from "@/utils/api";
import Weather from "@/components/Weather";
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

type EventDetailParams = {
  params: { id: number };
};

export default async function EventDetail({ params }: EventDetailParams) {
  const event = await getEventDetail(params.id);
  console.log("EVENT DETAIL");
  console.log(event);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className={"flex justify-between"}>
              {event.name}
              <Button>Add to favorites</Button>
            </div>
          </CardTitle>
          <CardDescription>
            {formatDates(event.dateFrom, event.dateTo)}
          </CardDescription>
        </CardHeader>
        <CardContent>{event.description}</CardContent>
        {event.link !== null && (
          <CardFooter className={"justify-end"}>
            <Link href={event.link}>
              <Button variant={"link"}>Learn more</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
      <Weather dateFrom={event.dateFrom} dateTo={event.dateTo} />
    </>
  );
}
