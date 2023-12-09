import { Button } from "@/components/ui/button";
import Link from "next/link";
import User from "./User";

function Header() {
  return (
    <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <h1 className="text-2xl whitespace-nowrap self-center hidden sm:block">
        <Link href="/">Brno Weather Capsule</Link>
      </h1>
      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm gap-2">
        <Button variant="secondary" asChild>
          <Link href="/events">All Events</Link>
        </Button>
        <User />
      </div>
    </header>
  );
}

export default Header;
