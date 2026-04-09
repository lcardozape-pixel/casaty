"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", showArrow = false, children, ...props }, ref) => {
    const variants = {
      primary: "bg-[#0127AC] text-white hover:bg-black shadow-lg shadow-black/5",
      secondary: "bg-neutral-800 text-white hover:bg-neutral-900 border border-neutral-700",
      outline: "border-2 border-[#0127AC] text-[#0127AC] hover:bg-[#0127AC] hover:text-white",
      ghost: "text-[#0127AC] hover:bg-slate-50",
    };

    const sizes = {
      sm: "h-8 px-4 text-[10px] rounded-md",
      md: "h-9 px-5 text-xs rounded-lg",
      lg: "h-12 px-8 text-sm rounded-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {children as React.ReactNode}
        {showArrow && (
          <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };


