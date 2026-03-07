"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function FloatingPhone() {
  const t = useTranslations("hero");

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 z-50 start-8"
    >
      <motion.a
        href={`tel:+${WHATSAPP_NUMBER}`}
        aria-label={t("callTooltip")}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-dark transition-transform duration-200 hover:scale-110"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(245, 223, 89, 0.5), 0 4px 16px rgba(245, 223, 89, 0.3)",
            "0 0 0 14px rgba(245, 223, 89, 0), 0 4px 16px rgba(245, 223, 89, 0.3)",
            "0 0 0 0 rgba(245, 223, 89, 0.5), 0 4px 16px rgba(245, 223, 89, 0.3)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          },
        }}
      >
        {/* Phone Icon */}
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>

        {/* Tooltip */}
        <span className="pointer-events-none absolute -end-20 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 md:block">
          {t("callTooltip")}
        </span>
      </motion.a>
    </motion.div>
  );
}
