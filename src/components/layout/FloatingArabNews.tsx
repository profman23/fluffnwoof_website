"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface FloatingArabNewsProps {
  onClick: () => void;
  /** Toggled true briefly when the intro video "lands" in the button. */
  justReceived?: boolean;
}

/**
 * Floating button that replays the Arab News feature video. The intro video
 * shrinks into this button on dismissal, so `justReceived` fires a short pop
 * to confirm "the video is stored here".
 */
export const FloatingArabNews = forwardRef<
  HTMLButtonElement,
  FloatingArabNewsProps
>(function FloatingArabNews({ onClick, justReceived }, ref) {
  const t = useTranslations("intro");

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 z-50 end-28"
    >
      <motion.button
        ref={ref}
        onClick={onClick}
        aria-label={t("replayTooltip")}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-accent text-dark transition-transform duration-200 hover:scale-110"
        animate={
          justReceived
            ? { scale: [1, 1.3, 0.95, 1] }
            : {
                boxShadow: [
                  "0 0 0 0 rgba(234, 184, 213, 0.5), 0 4px 16px rgba(234, 184, 213, 0.35)",
                  "0 0 0 12px rgba(234, 184, 213, 0), 0 4px 16px rgba(234, 184, 213, 0.35)",
                  "0 0 0 0 rgba(234, 184, 213, 0.5), 0 4px 16px rgba(234, 184, 213, 0.35)",
                ],
              }
        }
        transition={
          justReceived
            ? { duration: 0.5, ease: "easeInOut" }
            : {
                boxShadow: {
                  duration: 2.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }
        }
      >
        {/* Newspaper icon — signals a news/media feature */}
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5h13a1 1 0 011 1v12a1 1 0 01-1 1H5a2 2 0 01-2-2V7" />
          <path d="M19 8h1.5a1.5 1.5 0 011.5 1.5V17a2 2 0 01-2 2" />
          <line x1="7" y1="8" x2="14" y2="8" />
          <line x1="7" y1="11.5" x2="14" y2="11.5" />
          <line x1="7" y1="15" x2="11" y2="15" />
        </svg>

        {/* Small play badge — hints it opens a video */}
        <span className="absolute -bottom-0.5 -end-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-dark text-white shadow ring-2 ring-accent">
          <svg className="h-2.5 w-2.5 ms-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>

        {/* Tooltip */}
        <span className="pointer-events-none absolute bottom-full mb-3 start-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 md:block">
          {t("replayTooltip")}
        </span>
      </motion.button>
    </motion.div>
  );
});
