"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import popupImg from "@/assets/popup.png";

interface DoctorProfileCardProps {
  doctorId: string;
  onBack: () => void;
  onClose: () => void;
}

const BIO_KEYS = ["bio_1", "bio_2", "bio_3", "bio_4"] as const;
const SPEC_KEYS = ["spec_1", "spec_2", "spec_3", "spec_4"] as const;

export function DoctorProfileCard({
  doctorId,
  onBack,
  onClose,
}: DoctorProfileCardProps) {
  const t = useTranslations("popup");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const doctorKey = `doctors.${doctorId}`;

  return (
    <div className="flex max-h-[80vh] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-dark"
        >
          <svg
            className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span>{t("back")}</span>
        </button>

        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-dark"
          aria-label={t("close")}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="scrollbar-thin overflow-y-auto px-5 pb-6">
        {/* Doctor photo - cropped from group photo */}
        <motion.div
          className="mx-auto mb-4 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-3 ring-primary/40 ring-offset-2">
            <Image
              src={popupImg}
              alt={t(`${doctorKey}.name`)}
              fill
              className="object-cover"
              style={{ objectPosition: "50% 12%" }}
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h3
          className="text-center text-xl font-bold text-dark"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {t(`${doctorKey}.name`)}
        </motion.h3>

        {/* Accent divider */}
        <motion.div
          className="mx-auto my-3 h-0.5 w-16 rounded-full bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />

        {/* Title */}
        <motion.p
          className="mb-5 text-center text-sm font-medium text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {t(`${doctorKey}.title`)}
        </motion.p>

        {/* Bio paragraphs */}
        <div className="mb-5 space-y-3">
          {BIO_KEYS.map((key, i) => (
            <motion.p
              key={key}
              className="text-sm leading-relaxed text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              {t(`${doctorKey}.${key}`)}
            </motion.p>
          ))}
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap justify-center gap-2">
          {SPEC_KEYS.map((key, i) => (
            <motion.span
              key={key}
              className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-dark"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.06 }}
            >
              {t(`${doctorKey}.${key}`)}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
