"use client";
import Footer from "@/components/ui/footer";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "sonner";

import localFont from "next/font/local";
import Navbar from "../components/ui/navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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

// export const metadata: Metadata = {
//   title: "Eventify find events around you ",
//   description:
//     "Stay updated with real-time events happening around you or worldwide. Discover, explore, and never miss out on what's happening now!",
// };

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  // Keep server requests isolated and preserve the browser cache across renders.
  if (typeof window === "undefined") return new QueryClient();
  browserQueryClient ??= new QueryClient();
  return browserQueryClient;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={getQueryClient()}>
        <AuthProvider>
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
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
