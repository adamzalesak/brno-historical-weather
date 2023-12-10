import Weather from "@/components/Weather";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DateDetail({
  searchParams: { dateFrom, dateTo },
}: {
  searchParams: {
    dateFrom?: string;
    dateTo?: string;
  };
}) {
  const variant = dateFrom && dateTo ? "interval" : "single";

  const createObjectQueryParams =
    `dateFrom=${dateFrom}` + (dateTo ? `&dateTo=${dateTo}` : "");

  return (
    <div className="grid md:grid-cols-5 gap-4">
      <Card className="md:col-span-3 h-fit">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              {variant === "interval"
                ? "Selected Date Interval"
                : "Selected Date"}
              <Button variant="outline" asChild>
                <Link href={`/create-event?${createObjectQueryParams}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Link>
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            {variant === "interval"
              ? `${dateFrom} - ${dateTo}`
              : dateFrom
                ? dateFrom
                : null}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="md:col-span-2">
        {variant === "interval" ? (
          <Weather dateFrom={dateFrom!} dateTo={dateTo} />
        ) : dateFrom ? (
          <Weather dateFrom={dateFrom} />
        ) : null}
      </div>
    </div>
  );
}
