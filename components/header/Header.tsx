import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { BackButton } from "./BackButton";
import User from "./User";
import { Home } from "lucide-react";

async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full flex justify-center">
      <BackButton />
      <Button variant="ghost" className="md:hidden">
        <Link href="/">
          <Home className="w-4" />
        </Link>
      </Button>
      <h1 className="text-2xl pr-3 whitespace-nowrap self-center hidden md:block">
        <Link href="/">Brno Historical Weather</Link>
      </h1>

      <div className="flex justify-end items-center gap-2 ml-auto">
        <Button variant="secondary" asChild>
          <Link href="/events">All Events</Link>
        </Button>
        {user && (
          <Button asChild variant="secondary">
            <Link href="/my-events">My Events</Link>
          </Button>
        )}
        <User />
      </div>
    </header>
  );
}

export default Header;
