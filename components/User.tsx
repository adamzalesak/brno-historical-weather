import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function User() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
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
        <Link href="/login">Register</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link href="/login">Log-In</Link>
      </Button>
    </>
  );
}
