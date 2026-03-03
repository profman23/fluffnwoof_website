"use client";

import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STAT_KEYS = ["years", "reviews", "happyPets", "surgeries"] as const;

export function StatsCounter() {
  const t = useTranslations("about.stats");

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
      {STAT_KEYS.map((key, i) => (
        <ScrollReveal key={key} delay={i * 0.1}>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary md:text-5xl">
              <AnimatedCounter
                value={parseInt(t(`${key}.value`))}
                suffix={t(`${key}.suffix`)}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              {t(`${key}.label`)}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
