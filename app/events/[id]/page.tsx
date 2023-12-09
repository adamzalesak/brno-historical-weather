import { getEventDetail } from "@/utils/api";
import Weather from "@/components/Weather";

type EventDetailParams = {
  params: { id: number };
};

export default async function EventDetail({ params }: EventDetailParams) {
  const event = await getEventDetail(params.id);
  console.log("EVENT DETAIL");
  console.log(event);

  return (
    <div>
      {event.name}
      <br />
      {event.description}
      <Weather dateFrom={event.dateFrom} dateTo={event.dateTo} />
    </div>
  );
}
