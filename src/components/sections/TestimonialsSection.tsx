"use client";

import { useTranslations } from "next-intl";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    text: string;
    name: string;
    rating: number;
    image: string;
  }>;

  // Double the items for seamless infinite loop
  const duplicated = [...items, ...items];

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

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-white to-transparent rtl:bg-gradient-to-l md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-white to-transparent rtl:bg-gradient-to-r md:w-32" />

        {/* Scrolling track */}
        <div className="animate-marquee flex gap-6 py-4">
          {duplicated.map((item, i) => (
            <TestimonialCard
              key={i}
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
