"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useCallback } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

const SOCIAL_ICON_CONFIG: Record<string, { src: string; colors: string }> = {
  instagram: {
    src: "https://cdn.lordicon.com/dbugezxr.json",
    colors:
      "primary:#121331,secondary:#ffc738,tertiary:#f28ba8,quaternary:#d1fad7,quinary:#ebe6ef",
  },
  twitter: {
    src: "https://cdn.lordicon.com/guvfanks.json",
    colors: "primary:#121331,secondary:#d1fad7,tertiary:#ffc738",
  },
  snapchat: {
    src: "https://cdn.lordicon.com/guahgoeh.json",
    colors: "primary:#121331,secondary:#ffc738,tertiary:#ffc738",
  },
  tiktok: {
    src: "https://cdn.lordicon.com/tcpcckvk.json",
    colors:
      "primary:#121331,secondary:#ffc738,tertiary:#d1fad7,quaternary:#eab8d5,quinary:#d1fad7",
  },
};

const SOCIAL_KEYS = Object.keys(SOCIAL_LINKS);
const ANIMATION_INTERVAL_MS = 2000;

export function Footer() {
  const t = useTranslations("footer");
  const iconRefs = useRef<(LordIconElement | null)[]>([]);
  const currentIndexRef = useRef(0);

  const playNextIcon = useCallback(() => {
    const index = currentIndexRef.current;
    const el = iconRefs.current[index];

    if (el?.playerInstance) {
      el.playerInstance.playFromBeginning();
    }

    currentIndexRef.current = (index + 1) % SOCIAL_KEYS.length;
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    // Poll until lord-icon elements are ready
    const checkId = setInterval(() => {
      const firstEl = iconRefs.current[0];
      if (firstEl?.playerInstance) {
        clearInterval(checkId);
        playNextIcon();
        intervalId = setInterval(playNextIcon, ANIMATION_INTERVAL_MS);
      }
    }, 200);

    return () => {
      clearInterval(checkId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [playNextIcon]);

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl border-t border-dark/10 px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Slogan */}
          <span className="text-base font-medium text-dark-light">
            {t("slogan")}
          </span>

          {/* Social Links */}
          <div className="flex gap-3">
            {SOCIAL_KEYS.map((key, index) => (
              <a
                key={key}
                href={SOCIAL_LINKS[key as keyof typeof SOCIAL_LINKS]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={key}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/20 transition-all duration-200 hover:border-primary hover:bg-primary"
              >
                <lord-icon
                  ref={(el: LordIconElement | null) => {
                    iconRefs.current[index] = el;
                  }}
                  src={SOCIAL_ICON_CONFIG[key]?.src}
                  colors={SOCIAL_ICON_CONFIG[key]?.colors}
                  stroke="bold"
                  trigger="hover"
                  style={{ width: "28px", height: "28px" }}
                />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-dark-light">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
