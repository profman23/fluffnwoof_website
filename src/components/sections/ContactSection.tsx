"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WHATSAPP_BASE_URL, GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_LINK } from "@/lib/constants";

export function ContactSection() {
  const t = useTranslations("contact");

  const contactItems = [
    {
      label: t("addressLabel"),
      value: t("address"),
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      href: GOOGLE_MAPS_LINK,
    },
    {
      label: t("phoneLabel"),
      value: t("phone"),
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: WHATSAPP_BASE_URL,
    },
  ];

  return (
    <section id="contact" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Custom heading with Lordicon */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-primary" />
          <div className="flex items-center justify-center gap-3">
            {/* @ts-ignore - lord-icon is a custom web component */}
            <lord-icon
              src="https://cdn.lordicon.com/rpiilvmo.json"
              trigger="loop"
              delay="1000"
              colors="primary:#121331,secondary:#f5df59,tertiary:#eab8d5,quaternary:#cee8dc"
              style={{ width: "80px", height: "80px" }}
            />
            <h2 className="text-3xl font-bold text-dark md:text-4xl lg:text-5xl">
              {t("sectionTitle")}
            </h2>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="right">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl bg-white/60 p-6 backdrop-blur transition-colors hover:bg-white/80"
                >
                  <div className="shrink-0 text-primary-dark">{item.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-1 text-lg font-medium text-dark">{item.value}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}

            {/* Working Hours */}
            <ScrollReveal delay={0.2} direction="right">
              <div className="rounded-2xl bg-white/60 p-6 backdrop-blur">
                <div className="mb-4 flex items-start gap-4">
                  <div className="shrink-0 text-primary-dark">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">{t("hoursLabel")}</p>
                </div>
                <div className="space-y-3 ps-10">
                  {(["weekdays", "tuesday", "friday"] as const).map((period) => (
                    <div key={period}>
                      <p className="font-medium text-dark">
                        {t(`hours.${period}.days`)}
                      </p>
                      <p className="text-sm text-dark-light">
                        {t(`hours.${period}.time`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map */}
          <ScrollReveal direction="left">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fluff N' Woof Location"
                className="h-full min-h-[350px] w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
