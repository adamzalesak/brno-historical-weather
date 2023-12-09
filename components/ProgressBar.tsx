"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const AppProgressBar = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <>
      <ProgressBar color="black" />
      {children}
    </>
  );
};
