"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  className?: string;
}

export function ServiceHero({ title, subtitle, backgroundImage, className }: ServiceHeroProps) {
  return (
    <section className={cn("relative h-[400px] flex items-center justify-center overflow-hidden", className)}>
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/70 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-medium text-slate-200 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}



