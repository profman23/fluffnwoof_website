"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import popupImg from "@/assets/popup.png";
import { DoctorProfileCard } from "./DoctorProfileCard";
import { LanguageSwitcher } from "./LanguageSwitcher";

const STORAGE_KEY = "fluffnwoof_popup_dismissed";

const DOCTOR_HOTSPOTS = [
  { id: "coming-soon", top: "5%", left: "2%", width: "28%", height: "65%" },
  { id: "ahmed-mandour", top: "5%", left: "30%", width: "40%", height: "65%" },
  { id: "coming-soon", top: "5%", left: "70%", width: "28%", height: "65%" },
];

export function WelcomePopup() {
  const t = useTranslations("popup");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dontShow, setDontShow] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Show hint after popup opens
  useEffect(() => {
    if (isOpen && !activeDoctor) {
      const hintTimer = setTimeout(() => setShowHint(true), 1500);
      return () => clearTimeout(hintTimer);
    }
  }, [isOpen, activeDoctor]);

  const handleClose = () => {
    setIsOpen(false);
    setActiveDoctor(null);
    if (dontShow) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (!mounted) return null;

  const slideDir = isRTL ? -1 : 1;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {activeDoctor === null ? (
                <motion.div
                  key="main-view"
                  className="max-h-[90vh] overflow-y-auto"
                  initial={{ opacity: 0, x: -20 * slideDir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 * slideDir }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Header: Language switcher + hint + close */}
                  <div className="flex items-center justify-between px-3 py-2">
                    <LanguageSwitcher className="border-0 bg-gray-100 text-xs" />

                    {showHint && (
                      <motion.p
                        className="text-center text-xs font-medium text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        {t("tapToLearnMore")}
                      </motion.p>
                    )}

                    <button
                      onClick={handleClose}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-dark transition-colors hover:bg-gray-200"
                      aria-label={t("close")}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Image with doctor hotspots */}
                  <div className="relative">
                    <Image
                      src={popupImg}
                      alt="Fluff N' Woof"
                      className="w-full"
                      priority
                    />

                    {/* Doctor hotspots */}
                    {DOCTOR_HOTSPOTS.map((hotspot, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveDoctor(hotspot.id)}
                        className="absolute cursor-pointer rounded-xl transition-all duration-300 hover:bg-primary/10 active:bg-primary/15"
                        style={{
                          top: hotspot.top,
                          left: hotspot.left,
                          width: hotspot.width,
                          height: hotspot.height,
                        }}
                        aria-label={
                          hotspot.id === "coming-soon"
                            ? t("comingSoon")
                            : t(`doctors.${hotspot.id}.name`)
                        }
                      >
                        {/* Pulse hint on all doctors */}
                        {showHint && (
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: [0, 0.6, 0, 0.6, 0],
                              boxShadow: [
                                "inset 0 0 0 0 rgba(245,223,89,0)",
                                "inset 0 0 24px 4px rgba(245,223,89,0.35)",
                                "inset 0 0 0 0 rgba(245,223,89,0)",
                                "inset 0 0 24px 4px rgba(245,223,89,0.35)",
                                "inset 0 0 0 0 rgba(245,223,89,0)",
                              ],
                            }}
                            transition={{
                              duration: 3,
                              delay: index * 0.3,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 1,
                            }}
                          />
                        )}

                      </button>
                    ))}
                  </div>

                  {/* Don't show again */}
                  <div className="px-5 py-4">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input
                        type="checkbox"
                        checked={dontShow}
                        onChange={(e) => setDontShow(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 accent-primary"
                      />
                      <span className="text-sm text-gray-500">
                        {t("dontShowAgain")}
                      </span>
                    </label>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="doctor-view"
                  initial={{ opacity: 0, x: 20 * slideDir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 * slideDir }}
                  transition={{ duration: 0.25 }}
                >
                  <DoctorProfileCard
                    doctorId={activeDoctor}
                    onBack={() => setActiveDoctor(null)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
