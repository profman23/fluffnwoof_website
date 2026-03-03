"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-white to-secondary-light" />

      {/* Decorative blobs */}
      <div className="absolute -top-32 end-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 start-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute top-1/3 start-1/4 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-28 md:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Text Column */}
        <div className="text-center lg:text-start">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block rounded-full border border-secondary/40 bg-secondary/20 px-5 py-2 text-sm font-medium text-dark md:text-base">
              {t("badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-4xl font-bold leading-tight text-dark md:text-5xl lg:text-6xl"
          >
            {t("title")}
            <br />
            <span className="text-accent-dark">{t("titleHighlight")}</span>
          </motion.h1>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-4 text-xl text-secondary-dark md:text-2xl"
          >
            &quot;{t("slogan")}&quot;
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-8"
          >
            <Button
              variant="primary"
              size="lg"
              whatsappMessage={t("whatsappMessage")}
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
            >
              {t("cta")}
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 hidden lg:block"
          >
            <a href="#services" aria-label="Scroll to services">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-300 p-1"
              >
                <motion.div className="h-2 w-1.5 rounded-full bg-gray-400" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Video Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-auto w-full object-cover"
            >
              <source src="/videos/hero_video.mp4" type="video/mp4" />
            </video>
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/10 to-transparent" />
          </div>
          {/* Decorative accent behind video */}
          <div className="absolute -bottom-4 -end-4 -z-10 h-full w-full rounded-2xl bg-primary/20" />
        </motion.div>
      </div>
    </section>
  );
}
