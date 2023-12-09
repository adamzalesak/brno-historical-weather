import { Button } from "@/components/ui/button";
import Link from "next/link";
import User from "./User";

function Header() {
  return (
    <header className="w-full flex justify-center">
      <h1 className="text-2xl whitespace-nowrap self-center hidden sm:block">
        <Link href="/">Brno Weather Capsule</Link>
      </h1>
      <div className="flex justify-end items-center gap-2 ml-auto">
        <Button variant="secondary" asChild>
          <Link href="/events">All Events</Link>
        </Button>
        <User />
      </div>
    </header>
  );
}

export default Header;
