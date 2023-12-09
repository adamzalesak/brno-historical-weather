type EventListContainerProps = {
  children?: React.ReactNode;
};

export const EventListContainer = ({ children }: EventListContainerProps) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
