"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

const SERVICE_KEYS = [
  "surgery",
  "clinics",
  "vaccinations",
  "grooming",
  "petHotel",
  "labRadiology",
  "fluffyWheels",
] as const;

const SERVICE_IMAGES: Record<string, string> = {
  surgery:
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=700&q=80",
  clinics:
    "https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=700&q=80",
  vaccinations:
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=700&q=80",
  grooming:
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=700&q=80",
  petHotel:
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=80",
  labRadiology:
    "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=700&q=80",
  fluffyWheels:
    "https://images.unsplash.com/photo-1581888227599-779811939961?w=700&q=80",
};

const SERVICE_IMAGE_ALT: Record<string, string> = {
  surgery: "Veterinary surgery procedure",
  clinics: "Pet medical examination",
  vaccinations: "Pet vaccination",
  grooming: "Dog grooming session",
  petHotel: "Comfortable pet boarding",
  labRadiology: "Veterinary lab equipment",
  fluffyWheels: "Pet transportation service",
};

const SERVICE_COLORS = [
  "bg-accent-light",
  "bg-secondary-light",
  "bg-primary-light",
  "bg-accent-light",
  "bg-secondary-light",
  "bg-primary-light",
  "bg-accent-light",
];

const SERVICE_BG: Record<string, string | null> = {
  surgery: "bg-accent-light",
  clinics: null,
  vaccinations: "bg-primary-light",
  grooming: null,
  petHotel: "bg-secondary-light",
  labRadiology: null,
  fluffyWheels: null,
};

function ServiceIcon({ index }: { index: number }) {
  const icons = [
    <svg key={0} className="h-7 w-7 text-accent-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
    </svg>,
    <svg key={1} className="h-7 w-7 text-secondary-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>,
    <svg key={2} className="h-7 w-7 text-primary-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>,
    <svg key={3} className="h-7 w-7 text-accent-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>,
    <svg key={4} className="h-7 w-7 text-secondary-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>,
    <svg key={5} className="h-7 w-7 text-primary-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>,
    <svg key={6} className="h-7 w-7 text-accent-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  const whatsappPrefix =
    locale === "ar"
      ? "مرحباً، أود الاستفسار عن خدمة"
      : "Hello, I'd like to inquire about";

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Custom heading with Lordicon */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-primary" />
          <div className="flex items-center justify-center gap-3">
            {/* @ts-ignore - lord-icon is a custom web component */}
            <lord-icon
              src="https://cdn.lordicon.com/uvhiynvp.json"
              trigger="loop"
              delay="1000"
              colors="primary:#121331,secondary:#eab8d5,tertiary:#ffc738,quaternary:#cee8dc"
              style={{ width: "80px", height: "80px" }}
            />
            <h2 className="text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
          <p className="mt-4 text-lg text-gray-500 md:text-xl">
            {t("sectionSubtitle")}
          </p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {SERVICE_KEYS.map((key, i) => {
            const isEven = i % 2 === 0;
            const bullets = t.raw(`${key}.bullets`) as string[];
            const extendedDescription =
              key === "fluffyWheels"
                ? t(`${key}.extendedDescription`)
                : undefined;

            const bgColor = SERVICE_BG[key];

            return (
              <div
                key={key}
                className={cn(
                  "grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16",
                  bgColor && `${bgColor} rounded-3xl p-6 md:p-10`
                )}
              >
                {/* Image */}
                <ScrollReveal
                  direction={isEven ? "left" : "right"}
                  delay={0.1}
                  className={isEven ? "md:order-1" : "md:order-2"}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={SERVICE_IMAGES[key]}
                      alt={SERVICE_IMAGE_ALT[key]}
                      width={700}
                      height={470}
                      className="h-[300px] w-full object-cover md:h-[350px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/10 to-transparent" />
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal
                  direction={isEven ? "right" : "left"}
                  delay={0.2}
                  className={isEven ? "md:order-2" : "md:order-1"}
                >
                  <div>
                    {/* Icon + Title */}
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${SERVICE_COLORS[i]}`}
                      >
                        <ServiceIcon index={i} />
                      </div>
                      <h3 className="text-2xl font-bold text-dark md:text-3xl">
                        {t(`${key}.title`)}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-base leading-relaxed text-gray-500 md:text-lg">
                      {t(`${key}.description`)}
                    </p>

                    {extendedDescription && (
                      <p className="mb-4 text-base leading-relaxed text-gray-500 md:text-lg">
                        {extendedDescription}
                      </p>
                    )}

                    {/* Bullets */}
                    {bullets.length > 0 && (
                      <ul className="mb-6 space-y-2 text-sm text-gray-600 md:text-base">
                        {bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="shrink-0 text-sm">🐾</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA */}
                    <Button
                      variant="primary"
                      size="sm"
                      whatsappMessage={`${whatsappPrefix} ${t(`${key}.title`)}`}
                      icon={
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      }
                    >
                      {t(`${key}.cta`)}
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
