import { AppProgressBar } from "@/components/ProgressBar";
import Header from "@/components/header/Header";
import { GeistSans } from "geist/font/sans";
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
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground flex flex-col">
        <>
          <AppProgressBar />
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="justify-between items-center w-full max-w-5xl flex p-3">
              <Header />
            </div>
          </nav>
          <main className="bg-[url('/background-image.png')] bg-cover">
            <div className="py-8 min-h-[calc(100dvh-4rem)] flex flex-col items-center bg-card">
              <div className="w-full px-8 max-w-5xl">{children}</div>
            </div>
          </main>
        </>
      </body>
    </html>
  );
}
