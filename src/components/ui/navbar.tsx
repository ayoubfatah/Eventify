"use client";
import { cn } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

type Routes = {
  name: string;
  path: string;
};

const routes: Routes[] = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
  { name: "explore", path: "/explore" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const activePathname = usePathname();

  return (
    <header className="overflow-hidden flex justify-between py-5 items-center font-semibold container mx-auto">
      {/* Logo */}
      <span>
        <Link href={"/"}>Logo</Link>
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

      {/* Mobile Navigation */}
      <div className="relative block sm:hidden">
        {/* Menu Trigger Button */}
        <motion.button
          className="fixed top-2 right-2 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center"
          onClick={toggleMenu}
          whileTap={{ scale: 1.1 }}
          animate={isOpen ? "opened" : "closed"}
        >
          <motion.div
            className={`absolute h-full w-full inset-0 ${
              isOpen ? "scale-[50]" : "scale-0"
            } bg-white z-[500] rounded-full transition-scale duration-700 ease-in-out`}
          />
          <motion.div
            variants={{
              closed: { rotate: 0 },
              opened: { rotate: 225 - 45 },
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

        {isOpen && (
          <motion.div
            animate={{
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            exit={{
              background: "rgba(0,0,0,0)",
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="fixed right-[120px] mt-[200px] z-[1000] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: {
                  duration: 0.3,
                  ease: "easeIn",
                },
              }}
              className="text-white text-center space-y-4"
            >
              {routes.map((link, index) => (
                <motion.a
                  key={link.path}
                  href={link.path}
                  className="block text-3xl font-bold text-black transition-colors"
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.5 + index * 0.2,
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 50,
                    transition: {
                      duration: 0.3,
                      ease: "easeIn",
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
