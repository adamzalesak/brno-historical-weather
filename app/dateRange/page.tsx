export default function DateRange({
  searchParams: { dateFrom, dateTo },
}: {
  searchParams: {
    dateFrom?: string;
    dateTo?: string;
  };
}) {
  return (
    <div>
      <h1>Detail page</h1>
      <p>From: {dateFrom && new Date(dateFrom).toISOString()}</p>
      <p>To: {dateTo && new Date(dateTo).toISOString()}</p>
    </div>
  );
}
