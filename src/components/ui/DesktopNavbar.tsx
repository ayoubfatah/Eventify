"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Route } from "./navbar";

type UserType = {
  firstName: string;
  secondName: string;
  email: string;
} | null;

type DesktopNavbarProps = {
  routes: Route[];
  user: UserType;
  isLoggedIn: boolean;
  isLoading: boolean;
  logOut: () => void;
};

export default function DesktopNavbar({
  routes,
  user,
  isLoggedIn,
  isLoading,
  logOut,
}: DesktopNavbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setUserMenuOpen(false));

  const activePathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="-translate-y-[200px] sm:translate-y-0 sm:flex">
        <ul className="flex justify-between gap-4 items-center">
          {routes.map((route) => (
            <li key={route.name} className="relative">
              <Link
                prefetch
                className={cn("hover:text-white transition relative", {
                  "text-white": activePathname === route.path,
                  "text-white/60": activePathname !== route.path,
                })}
                href={route.path}
              >
                {route.name}
              </Link>

              {activePathname === route.path && (
                <motion.div
                  layoutId="active-link"
                  className="absolute h-1 w-full -bottom-1 bg-primary"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Auth */}
      {isLoading ? (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
          <div className="w-20 h-4 rounded-md bg-white/10 animate-pulse" />
        </div>
      ) : (
        <div className="hidden sm:flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-white/70 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-5 py-2 rounded-full bg-primary text-white hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={ref}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User size={17} />
                </div>

                <span className="text-white">{user?.firstName}</span>

                <ChevronDown
                  size={17}
                  className={cn("transition-transform", {
                    "rotate-180": userMenuOpen,
                  })}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.95,
                    }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-[9999999] bg-black right-0 mt-2 w-48 rounded-xl border border-primary shadow-xl"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="font-semibold text-gray-50">
                        {user?.firstName} {user?.secondName}
                      </p>

                      <p className="text-sm text-gray-50/50">{user?.email}</p>
                    </div>

                    <div className="p-1">
                      <Link
                        href="/add-event"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-gray-50 hover:bg-white/5 transition"
                      >
                        Add event
                      </Link>

                      <Link
                        href="/my-events"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-gray-50 hover:bg-white/5 transition"
                      >
                        My Events
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          logOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-red-500 hover:!bg-red-500/10 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}
    </>
  );
}
