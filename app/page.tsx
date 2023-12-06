import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import DateSelector from "@/components/DateSelector";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center h-screen">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
          <Header />
        </div>
      </nav>

      <Card>
        <CardHeader>
          <CardTitle>Journey Through Brno's Climatic Past</CardTitle>
          <CardDescription>
            Go on a historical voyage to uncover Brno's weather secrets across
            the ages.
          </CardDescription>
        </CardHeader>
      </Card>
      <DateSelector />
    </div>
  );
}
