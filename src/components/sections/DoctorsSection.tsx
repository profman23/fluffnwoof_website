"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import popupImg from "@/assets/popup.png";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WelcomePopup } from "@/components/ui/WelcomePopup";

/**
 * In-page entry point for the doctors experience. Renders a small, unobtrusive
 * card that — when tapped — opens the existing WelcomePopup (three clickable
 * doctor hotspots + DoctorProfileCard). Replaces the old auto-opening popup so
 * it no longer interrupts visitors on load; the card stays available at all
 * times and the popup can be reopened as often as the visitor likes.
 */
export function DoctorsSection() {
  const t = useTranslations("doctorsSection");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [open, setOpen] = useState(false);

  return (
    <section id="doctors" className="relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Compact heading */}
        <div className="mb-6 text-center md:mb-8">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-primary" />
          <div className="flex items-center justify-center gap-3">
            {/* @ts-ignore - lord-icon is a custom web component */}
            <lord-icon
              src="https://cdn.lordicon.com/tbkhjrnd.json"
              trigger="loop"
              delay="1000"
              colors="primary:#121331,secondary:#ffc738,tertiary:#d1fad7,quaternary:#eab8d5,quinary:#d1fad7,senary:#d1fad7"
              style={{ width: "80px", height: "80px" }}
            />
            <h2 className="text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
        </div>

        {/* Small entry card */}
        <ScrollReveal direction="up" delay={0.1}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mx-auto flex w-full max-w-md items-center gap-4 rounded-2xl border border-primary/30 bg-white p-3 text-start shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            {/* Doctors thumbnail */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-primary/30">
              <Image
                src={popupImg}
                alt={t("cardTitle")}
                fill
                className="object-cover"
                style={{ objectPosition: "50% 15%" }}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-dark">{t("cardTitle")}</p>
              <p className="mt-0.5 truncate text-xs font-medium text-primary-dark">
                {t("cardCta")}
              </p>
            </div>

            {/* Arrow */}
            <motion.svg
              className={`h-5 w-5 shrink-0 text-primary-dark ${isRTL ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </motion.svg>
          </button>
        </ScrollReveal>
      </div>

      {/* Reuses the full doctors experience (hotspots + profile cards) */}
      <WelcomePopup open={open} onClose={() => setOpen(false)} hideDismiss />
    </section>
  );
}
