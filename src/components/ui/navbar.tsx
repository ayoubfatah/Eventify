"use client";
import { cn } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Routes = {
  name: string;
  path: string;
};

const routes: Routes[] = [
  { name: "Home", path: "/" },
  { name: "All Events", path: "/events/all" },
];

export default function Navbar() {
  const activePathname = usePathname();

  return (
    <header className="flex justify-between   py-5 items-center font-semibold container mx-auto">
      <span>
        <Link href={"/"}>Logo</Link>
      </span>
      <nav className="">
        <ul className="  flex justify-between gap-4 items-center ">
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
                  className="absolute h-1  w-full -bottom-1 bg-primary"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
