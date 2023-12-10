import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default async function User() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <>
      <span className="hidden md:block">{user.email}</span>
      <form action={signOut}>
        <Button variant="secondary">
          <LogOut className="w-4 sm:w-auto" />
        </Button>
      </form>
    </>
  ) : (
    <>
      <Button asChild variant="secondary">
        <Link href="/register">Register</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="/login">Log-In</Link>
      </Button>
    </>
  );
}
