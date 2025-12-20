import { cn } from "@/utils/cn";

export const iconBtnClass = cn(
  "p-3",
  "aspect-square",
  "h-12",
  "pointer-events-auto",
  "rounded-full",
  "self-center",
  "hover:bg-foreground/10",
  "",
  ""
);

export const compressedBtnClass = cn("px-5!", "py-1.5!", "h-fit!", "", "");

export const textBtnClass = cn(
  "aspect-auto",
  "text-nowrap",
  "flex items-center justify-center",
  "p-3",
  "h-12",
  "pointer-events-auto",
  "rounded-full",
  "",
  ""
);

export const primaryBtnClass = cn(
  "border border-accent-dark text-accent-dark",
  "hover:bg-accent-dark hover:text-container-solid",
  "",
  ""
);

export const secondaryBtnClass = cn(
  "border border-secondary text-secondary ",
  "hover:border-accent-dark hover:text-accent-dark",
  "",
  ""
);
