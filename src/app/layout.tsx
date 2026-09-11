"use client";
import Footer from "@/components/ui/footer";
import AuthProvider from "@/context/AuthProvider";

import localFont from "next/font/local";
import Navbar from "../components/ui/navbar";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}   `}>
          <div className=" flex flex-col min-h-screen max-w-7xl mx-auto ">
            <Navbar />
            <main className=" lg:flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
