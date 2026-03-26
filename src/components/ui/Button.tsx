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
      primary: "bg-[#0040FF] text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
      secondary: "bg-neutral-800 text-white hover:bg-neutral-900 border border-neutral-700",
      outline: "border-2 border-[#0040FF] text-[#0040FF] hover:bg-[#0040FF] hover:text-white",
      ghost: "text-[#0040FF] hover:bg-blue-50/50",
    };

    const sizes = {
      sm: "px-2.5 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group",
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
