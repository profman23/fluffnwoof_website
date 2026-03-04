"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatsCounter } from "./StatsCounter";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative overflow-hidden bg-secondary-light py-20 md:py-28">
      {/* Decorative blob */}
      <div className="absolute end-0 top-0 h-64 w-64 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute bottom-0 start-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Custom heading with Lordicon */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-primary" />
          <div className="flex items-center justify-center gap-3">
            {/* @ts-ignore - lord-icon is a custom web component */}
            <lord-icon
              src="https://cdn.lordicon.com/amccvvin.json"
              trigger="loop"
              delay="1000"
              colors="primary:#121331,secondary:#ffc738,tertiary:#121331,quaternary:#cee8dc,quinary:#eab8d5,senary:#eab8d5,septenary:#121331,octonary:#eab8d5"
              style={{ width: "80px", height: "80px" }}
            />
            <h2 className="text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Story */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-dark-light">
                {t("story")}
              </p>
              <p className="text-lg leading-relaxed text-dark-light">
                {t("storyExtended")}
              </p>

              {/* Top clinic badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-5 py-3 text-base font-medium text-dark">
                <svg
                  className="h-5 w-5 text-primary-dark"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span>
                  {t("topClinic")}{" "}
                  <strong className="text-primary-dark">
                    {t("topClinicHighlight")}
                  </strong>
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* About Image */}
          <ScrollReveal direction="left">
            <div className="relative flex items-center justify-center">
              {/* Animated background blobs */}
              <div className="absolute h-72 w-72 animate-pulse rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -end-8 top-8 h-48 w-48 animate-pulse rounded-full bg-accent/20 blur-2xl [animation-delay:1s]" />

              <div className="relative overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=700&q=80"
                  alt="Happy dog and cat together"
                  width={700}
                  height={470}
                  className="h-[350px] w-full object-cover md:h-[420px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="mt-16 rounded-2xl bg-white p-8 shadow-[0_4px_24px_rgba(33,30,31,0.06)] md:mt-20 md:p-12">
          <StatsCounter />
        </div>
      </div>
    </section>
  );
}
