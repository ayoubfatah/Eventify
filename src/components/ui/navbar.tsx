"use client";

import { useAuth } from "@/context/AuthProvider";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export type Route = {
  name: string;
  path: string;
  locked: boolean;
};

export const routes: Route[] = [
  { name: "Home", path: "/", locked: false },
  { name: "All Events", path: "/events", locked: false },
  { name: "Reserved", path: "/reserved", locked: true },
];

export default function Navbar() {
  const { user, logOut, isLoading } = useAuth();

  const isLoggedIn = !!user;

  const visibleRoutes = routes.filter((route) => !route.locked || isLoggedIn);

  return (
    <header className="container mx-auto px-6 sm:px-0 py-5">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <span>
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-primary"
          >
            Eventify
          </a>
        </span>

        {/* Desktop */}
        <DesktopNavbar
          routes={visibleRoutes}
          user={user}
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          logOut={logOut}
        />

        {/* Mobile */}
        <MobileNavbar
          routes={visibleRoutes}
          user={user}
          isLoggedIn={isLoggedIn}
          logOut={logOut}
        />
      </div>
    </header>
  );
}
