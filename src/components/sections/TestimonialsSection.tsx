"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect, useState } from "react";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    text: string;
    name: string;
    rating: number;
    image: string;
  }>;

  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (trackRef.current) {
        // Measure the width of one set of cards (first half)
        const children = trackRef.current.children;
        let width = 0;
        for (let i = 0; i < items.length; i++) {
          const child = children[i] as HTMLElement;
          if (child) {
            width += child.offsetWidth;
          }
        }
        // Add gaps: (items.length) gaps of 24px (gap-6)
        width += items.length * 24;
        setTrackWidth(width);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Custom heading with Lordicon */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-primary" />
          <div className="flex items-center justify-center gap-3">
            {/* @ts-ignore - lord-icon is a custom web component */}
            <lord-icon
              src="https://cdn.lordicon.com/egzkfnoz.json"
              trigger="loop"
              delay="1000"
              colors="primary:#121331,secondary:#ffc738,tertiary:#ffc738,quaternary:#b26836,quinary:#121331,senary:#cee8dc,septenary:#121331,octonary:#d1fad7,nonary:#d1fad7,denary:#eab8d5,undenary:#eab8d5"
              style={{ width: "80px", height: "80px" }}
            />
            <h2 className="text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
        </div>
      </div>

      {/* Marquee container - force LTR so animation works identically in both locales */}
      <div dir="ltr" className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="marquee-track pointer-events-none flex gap-6 py-4"
          style={
            trackWidth
              ? ({
                  "--marquee-width": `${trackWidth}px`,
                } as React.CSSProperties)
              : undefined
          }
        >
          {/* First set - all 7 */}
          {items.map((item, i) => (
            <TestimonialCard
              key={`a-${i}`}
              text={item.text}
              name={item.name}
              rating={item.rating}
              image={item.image}
            />
          ))}
          {/* Second set - all 7 (duplicate for seamless loop) */}
          {items.map((item, i) => (
            <TestimonialCard
              key={`b-${i}`}
              text={item.text}
              name={item.name}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
