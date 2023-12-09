export const formatDates = (dateFrom: string, dateTo: string | null) => {
  const formatter = new Intl.DateTimeFormat("cz-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const dateFromDate = new Date(dateFrom);
  if (!dateTo) return formatter.format(dateFromDate);

  const dateToDate = new Date(dateTo);
  return formatter.formatRange(dateFromDate, dateToDate);
};
