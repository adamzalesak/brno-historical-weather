import { getEventDetail } from "@/utils/api";

type EventDetailParams = {
  params: { id: number };
};

export default async function EventDetail({ params }: EventDetailParams) {
  const event = await getEventDetail(params.id);

  return (
    <div>
      {event.name}
      <br />
      {event.description}
    </div>
  );
}
