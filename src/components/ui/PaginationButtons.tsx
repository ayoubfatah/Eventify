"use client";
import { div } from "framer-motion/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

type PaginationButtonsProps = {
  previousPath: string;
  nextPath: string;
};
const btnStyles =
  "py-4 px-6 rounded-md  bg-white/10 disabled:bg-white/40 disabled:cursor-not-allowed flex items-center gap-2";

export default function PaginationButtons({
  previousPath,
  nextPath,
}: PaginationButtonsProps) {
  console.log(previousPath, "prev");
  console.log(nextPath, "next");
  return (
    <div className="flex items-center  w-full justify-between">
      {previousPath ? (
        <Link href={previousPath} className={btnStyles}>
          <ArrowLeft size={20} /> Previous
        </Link>
      ) : (
        <div />
      )}

      {nextPath ? (
        <Link href={nextPath} className={btnStyles}>
          Next <ArrowRight size={20} />{" "}
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
