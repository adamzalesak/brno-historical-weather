export default function SingleDate({
  searchParams: { date },
}: {
  searchParams: {
    date?: string;
  };
}) {
  return (
    <div>
      <h1>Detail page</h1>
      {date && new Date(date).toISOString()}
    </div>
  );
}
