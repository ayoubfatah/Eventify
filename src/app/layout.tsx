import Footer from "@/components/ui/footer";
import { Toaster } from "sonner";

import { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/ui/navbar";
import "./globals.css";
import Providers from "./providers/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Eventify find events around you ",
  description:
    "Stay updated with real-time events happening around you or worldwide. Discover, explore, and never miss out on what's happening now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}   `}>
          <Toaster
            position="top-right"
            theme="dark"
            richColors
            closeButton
            visibleToasts={9} // Show more toasts at once
            offset={16}
          />
          <div className=" flex flex-col min-h-screen max-w-7xl mx-auto ">
            <Navbar />
            <main className=" lg:flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  );
}
