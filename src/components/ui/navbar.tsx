"use client";

import { cn } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Plus, User } from "lucide-react";

type Routes = {
  name: string;
  path: string;
};

const routes: Routes[] = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events" },
  { name: "Explore", path: "/explore" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // TODO: Replace this with your actual authentication logic
  const isLoggedIn = true;

  const activePathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className=" flex justify-between py-5 items-center font-semibold container mx-auto">
      {/* Logo */}
      <span>
        <Link href="/" className="text-primary font-bold text-2xl">
          Eventify
        </Link>
      </span>

      {/* Big Screen Navigation */}
      <nav className="-translate-y-[200px] sm:translate-y-0 sm:flex">
        <ul className="flex justify-between gap-4 items-center">
          {routes.map((route) => (
            <li key={route.name} className="relative">
              <Link
                prefetch={true}
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

      {/* Auth Buttons / User Menu */}
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
              className="px-5 py-2 rounded-full hover:text-pri bg-primary text-white hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* User button */}
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User size={17} />
              </div>

              <span className="text-white">John</span>

              <ChevronDown
                size={17}
                className={cn("transition-transform", {
                  "rotate-180": userMenuOpen,
                })}
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute  z-[9999999] bg-black right-0 mt-2 w-48 rounded-xl  border border-primary shadow-xl  "
                >
                  <div className="px-4 py-3 border-b border-black/10">
                    <p className="font-semibold text-gray-50 ">John Doe</p>
                    <p className="text-sm text-gray-50 /50">john@example.com</p>
                  </div>

                  <div className="p-1">
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-gray-50 cursor-pointer  hover:bg-white/5 transition"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/my-events"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-gray-50 cursor-pointer  hover:bg-white/5 transition"
                    >
                      My Events
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg text-gray-50  cursor-pointer hover:bg-white/5 transition"
                    >
                      Settings
                    </Link>

                    <button
                      onClick={() => {
                        // TODO: Add logout logic
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg cursor-pointer  text-red-500 hover:!bg-red-500/10 transition"
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

      {/* Mobile Navigation */}
      <div className="relative block sm:hidden">
        {/* Menu Trigger */}
        <motion.button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="fixed top-2 right-2 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center"
          onClick={toggleMenu}
          whileTap={{ scale: 1.1 }}
          animate={isOpen ? "opened" : "closed"}
        >
          <motion.div
            className={`absolute h-full w-full inset-0 ${
              isOpen ? "scale-[50]" : "scale-0"
            } bg-white z-[500] rounded-full transition-transform duration-700 ease-in-out`}
          />

          <motion.div
            variants={{
              closed: { rotate: 0 },
              opened: { rotate: 180 },
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center z-[1000] justify-center"
          >
            <motion.div
              variants={{
                closed: { rotate: 0 },
                opened: { rotate: 45 },
              }}
              transition={{ duration: 0.3 }}
            >
              <Plus
                size={35}
                strokeWidth={2}
                className="transition-colors text-black"
              />
            </motion.div>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[999999] flex items-center justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-center space-y-4"
              >
                {routes.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3 + index * 0.15,
                        duration: 0.5,
                        ease: "easeOut",
                      },
                    }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl font-bold text-black transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth */}
                <div className="pt-6 flex flex-col gap-3">
                  {!isLoggedIn ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-semibold text-black"
                      >
                        Login
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="px-6 py-3 rounded-full bg-primary text-white"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-semibold text-black"
                      >
                        Profile
                      </Link>

                      <Link
                        href="/my-events"
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-semibold text-black"
                      >
                        My Events
                      </Link>

                      <button
                        onClick={() => {
                          // TODO: logout
                          setIsOpen(false);
                        }}
                        className="text-xl font-semibold text-red-500"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
