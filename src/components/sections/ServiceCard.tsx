"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ServiceCardProps {
  title: string;
  description: string;
  extendedDescription?: string;
  bullets: string[];
  cta: string;
  whatsappMessage: string;
  colorClass: string;
  icon: React.ReactNode;
  delay?: number;
  featured?: boolean;
}

export function ServiceCard({
  title,
  description,
  extendedDescription,
  bullets,
  cta,
  whatsappMessage,
  colorClass,
  icon,
  delay = 0,
  featured = false,
}: ServiceCardProps) {
  return (
    <ScrollReveal delay={delay} className={featured ? "md:col-span-2 lg:col-span-3" : ""}>
      <div
        className={cn(
          "group flex h-full flex-col rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(33,30,31,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(33,30,31,0.12)] md:p-8",
          featured && "md:flex-row md:items-center md:gap-8"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl md:h-16 md:w-16",
            colorClass,
            featured && "md:mb-0 md:h-20 md:w-20"
          )}
        >
          {icon}
        </div>

        <div className="flex flex-1 flex-col">
          {/* Title */}
          <h3 className="mb-2 text-xl font-bold text-dark md:text-2xl">{title}</h3>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-gray-500 md:text-base">
            {description}
          </p>

          {extendedDescription && (
            <p className="mb-4 text-sm leading-relaxed text-gray-500 md:text-base">
              {extendedDescription}
            </p>
          )}

          {/* Bullets */}
          {bullets.length > 0 && (
            <ul className="mb-6 grid gap-2 text-sm text-gray-600 md:grid-cols-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 text-xs">🐾</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <Button
              variant="ghost"
              size="sm"
              whatsappMessage={whatsappMessage}
              className="group/btn gap-1 px-0"
            >
              {cta}
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1"
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
            </Button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
