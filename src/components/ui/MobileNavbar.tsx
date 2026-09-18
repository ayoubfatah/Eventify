"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Route } from "./navbar";



type User = {
  firstName: string;
  secondName: string;
  email: string;
} | null;

type MobileNavbarProps = {
  routes: Route[];
  user: User;
  isLoggedIn: boolean;
  logOut: () => void;
};

export default function MobileNavbar({
  routes,
  isLoggedIn,
  logOut,
}: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative block sm:hidden">
      {/* Mobile Menu Button */}
      <motion.button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="fixed right-4 top-4 z-[1000001] flex h-10 w-10 items-center justify-center rounded-full bg-white"
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
              className="flex h-full w-full items-center justify-center"
            >
              <div className="space-y-6 text-left">
                {/* Mobile Routes */}
                {routes.map((link, index) => (
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
                <div className="flex flex-col space-y-6 text-left text-3xl font-bold">
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
                          delay: 0.1 + routes.length * 0.15,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href="/login"
                          onClick={closeMobileMenu}
                          className="font-semibold text-primary"
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
                          delay: 0.1 + (routes.length + 1) * 0.15,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href="/signup"
                          onClick={closeMobileMenu}
                          className="rounded-full text-primary"
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
                          delay: 0.1 + routes.length * 0.15,
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
                          delay: 0.3 + (routes.length + 1) * 0.15,
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
                          delay: 0.3 + (routes.length + 2) * 0.15,
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
  );
}
