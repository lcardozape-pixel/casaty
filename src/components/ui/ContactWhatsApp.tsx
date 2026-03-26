"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "floating" | "button";
}

export function ContactWhatsApp({ 
  phoneNumber = "51987654321", 
  message = "Hola, me interesa obtener más información sobre sus servicios inmobiliarios.",
  className,
  variant = "floating"
}: ContactWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (variant === "button") {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#128C7E] transition-colors",
          className
        )}
      >
        <MessageCircle className="h-5 w-5" />
        CONSULTAR POR WHATSAPP
      </motion.a>
    );
  }

  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-colors flex items-center justify-center",
        className
      )}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </motion.a>
  );
}

