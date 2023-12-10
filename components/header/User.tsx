import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

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
      {user.email}
      <form action={signOut}>
        <Button variant="secondary">Logout</Button>
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
