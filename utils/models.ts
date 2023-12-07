export type EventListItem = {
  id: string;
  name: string;
  dateFrom: string;
  dateTo?: string;
};

export type EventDetail = {
  id: string;
  name: string;
  description: string;
  link: string;
  dateFrom: string;
  dateTo?: string;
};
