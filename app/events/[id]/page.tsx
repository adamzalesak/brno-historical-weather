import { NotFound } from "@/components/NotFound";
import Weather from "@/components/Weather";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEventDetail, getIsMyFavoriteEvent } from "@/utils/api";
import { formatDates } from "@/utils/formatDates";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

const revalidateCache = async () => {
  "use server";
  revalidatePath("/my-events", "layout");
};

export default async function EventDetail({
  params,
}: {
  params: { id: number };
}) {
  try {
    const event = await getEventDetail(params.id);
    const isMyFavorite = await getIsMyFavoriteEvent(params.id);

    return (
      <div className={"grid grid-cols-5 gap-4"}>
        <Card className={"col-span-3 "}>
          <CardHeader>
            <CardTitle>
              <div className={"flex justify-between"}>
                {event.name}
                <AddToFavoritesButton
                  id={params.id}
                  isMyFavorite={isMyFavorite}
                  revalidateCache={revalidateCache}
                />
              </div>
            </CardTitle>
            <CardDescription>
              {formatDates(event.dateFrom, event.dateTo)}
            </CardDescription>
          </CardHeader>
          <CardContent>{event.description}</CardContent>
          {event.link !== null && event.link !== "" && (
            <CardFooter className={"justify-end"}>
              <Button variant="link" asChild>
                <Link href={event.link}>Learn more</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
        <div className={"col-span-2"}>
          <Weather dateFrom={event.dateFrom} dateTo={event.dateTo} />
        </div>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <NotFound />;
  }
}
