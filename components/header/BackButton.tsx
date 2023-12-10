"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BackButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return null;
  }

  return (
    <Button variant="ghost" onClick={() => router.back()} className="mr-1">
      <ArrowLeft className="w-4 sm:w-auto" />
    </Button>
  );
};
