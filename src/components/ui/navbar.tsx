"use client";

import { useAuth } from "@/context/AuthProvider";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

type Routes = {
  name: string;
  path: string;
  locked: boolean;
};

const routes: Routes[] = [
  { name: "Home", path: "/", locked: false },
  { name: "All Events", path: "/events", locked: false },
  { name: "Reserved", path: "/reserved", locked: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const ref = useRef(null);

  useClickOutside(ref, () => setUserMenuOpen(false));

  const { user, logOut, isLoading } = useAuth();

  const isLoggedIn = !!user;

  const activePathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const visibleRoutes = routes.filter((route) => !route.locked || isLoggedIn);

  return (
    <header className="px-6 sm:px-0 flex justify-between py-5 items-center font-semibold container mx-auto">
      {/* Logo */}
      <span>
        <Link href="/" className="text-primary font-bold text-2xl">
          Eventify
        </Link>
      </span>

      {/* Desktop Navigation */}
      <nav className="-translate-y-[200px] sm:translate-y-0 sm:flex">
        <ul className="flex justify-between gap-4 items-center">
          {visibleRoutes.map((route) => (
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
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User size={17} />
                </div>

                <span className="text-white">{user.firstName}</span>

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
                    ref={ref}
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-[9999999] bg-black right-0 mt-2 w-48 rounded-xl border border-primary shadow-xl"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="font-semibold text-gray-50">
                        {user.firstName} {user.secondName}
                      </p>

                      <p className="text-sm text-gray-50/50">{user.email}</p>
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

      {/* Mobile Navigation */}
      <div className="relative block sm:hidden">
        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="fixed top-4 right-4 z-[1000001] w-10 h-10 bg-white rounded-full flex items-center justify-center"
          onClick={toggleMenu}
          whileTap={{ scale: 0.8 }}
          animate={isOpen ? "opened" : "closed"}
        >
          <motion.div
            variants={{
              closed: {
                rotate: 0,
              },
              opened: {
                rotate: 180,
              },
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <motion.div
              variants={{
                closed: {
                  rotate: 0,
                },
                opened: {
                  rotate: 45,
                },
              }}
              transition={{ duration: 0.3 }}
            >
              <Plus size={30} strokeWidth={2} className="text-black" />
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
              className="fixed inset-0 z-[1000000] bg-white"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  transition: {
                    duration: 0.1,
                  },
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="h-full w-full flex items-center justify-center"
              >
                <div className="text-left space-y-6">
                  {/* Mobile Routes */}
                  {visibleRoutes.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{
                        opacity: 0,
                        y: 50,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.1 + index * 0.15,
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                    >
                      <Link
                        href={link.path}
                        onClick={closeMobileMenu}
                        className="block text-3xl font-bold text-black transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Auth */}
                  <div className="flex flex-col text-left text-3xl space-y-6 font-bold">
                    {!isLoggedIn ? (
                      <>
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.1 + visibleRoutes.length * 0.15,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href="/login"
                            onClick={closeMobileMenu}
                            className="font-semibold  text-primary"
                          >
                            Login
                          </Link>
                        </motion.div>

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.1 + (visibleRoutes.length + 1) * 0.15,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href="/signup"
                            onClick={closeMobileMenu}
                            className=" rounded-full text-primary"
                          >
                            Sign Up
                          </Link>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.1 + visibleRoutes.length * 0.15,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href="/add-event"
                            onClick={closeMobileMenu}
                            className="font-semibold text-black"
                          >
                            Add Event
                          </Link>
                        </motion.div>

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.3 + (visibleRoutes.length + 1) * 0.15,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        >
                          <Link
                            href="/my-events"
                            onClick={closeMobileMenu}
                            className="font-semibold text-black"
                          >
                            My Events
                          </Link>
                        </motion.div>

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 50,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.3 + (visibleRoutes.length + 2) * 0.15,
                            duration: 0.5,
                            ease: "easeOut",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              logOut();
                              closeMobileMenu();
                            }}
                            className="text-left font-semibold text-red-500"
                          >
                            Logout
                          </button>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
