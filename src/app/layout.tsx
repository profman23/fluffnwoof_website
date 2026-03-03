import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";
import { dinNext, geDinar, dinNextArabic } from "@/lib/fonts";
import { JsonLd } from "@/components/layout/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "فلف أن ووف | مستشفى بيطري تخصصي في الرياض",
    template: "%s | فلف أن ووف",
  },
  description:
    "مستشفى فلف أن ووف البيطري التخصصي - صحة أليفك ودلاله بين أيدي أمينة. عمليات بيطرية، تطعيمات، قرومنق، فندقة، تحاليل وأشعة في الرياض.",
  keywords: [
    "عمليات بيطرية",
    "لقاحات كلاب",
    "تطعيم كلاب",
    "تطعيم قطط",
    "لقاحات قطط",
    "عيادة بيطرية",
    "طبيب بيطري",
    "بيطري",
    "بيطري قطط",
    "عياده بيطريه",
    "عيادة حيوانات",
    "عيادة قطط",
    "عيادة كلاب",
    "صيدليه بيطريه",
    "تعقيم القطط",
    "قرومنق",
    "خدمة تنظيف القطط",
    "vet near me",
    "pet shop",
    "vet clinic",
    "pet store",
    "pet clinic",
    "cat hotel",
    "pet hotel",
    "veterinary clinic",
    "cat boarding",
    "veterinary care",
    "pet grooming",
  ],
  openGraph: {
    title: "Fluff N' Woof | فلف أن ووف - مستشفى بيطري تخصصي",
    description: "صحة أليفك ودلاله بين أيدي أمينة | YOUR PET, OUR CARE",
    siteName: "Fluff N' Woof Veterinary Hospital",
    locale: "ar_SA",
    alternateLocale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${dinNext.variable} ${geDinar.variable} ${dinNextArabic.variable}`}
    >
      <body className="antialiased">
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
