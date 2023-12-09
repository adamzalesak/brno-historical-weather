import DateSelector from "@/components/DateSelector";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Index() {
  return (
    <div className="flex-1 flex flex-col gap-20 items-center">
      <Card>
        <CardHeader>
          <CardTitle>Journey Through Brno's Climatic Past</CardTitle>
          <CardDescription>
            Go on a historical voyage to uncover Brno's weather secrets across
            the ages.
          </CardDescription>
        </CardHeader>
      </Card>
      <DateSelector />
    </div>
  );
}
