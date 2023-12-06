import AuthButton from "@/components/AuthButton";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { GeistSans } from "geist/font/sans";
import { cookies } from "next/headers";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Weather Capsule",
  description: "Historical weather in Brno",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
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
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground flex flex-col">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Header />
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
        <div className="bg-[url('/background-image.png')] bg-cover bg min-h-[calc(100dvh-4rem)]">
          <main className="pt-4 min-h-[calc(100dvh-4rem)] flex flex-col items-center bg-white bg-opacity-60">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
