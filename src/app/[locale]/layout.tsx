import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { dinNext, geDinar, dinNextArabic } from "@/lib/fonts";
import { JsonLd } from "@/components/layout/JsonLd";
import { routing } from "@/i18n/routing";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${dinNext.variable} ${geDinar.variable} ${dinNextArabic.variable}`}
    >
      <body className="antialiased">
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MFLR293');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFLR293"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="lazyOnload" />
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
