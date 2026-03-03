import localFont from "next/font/local";

export const dinNext = localFont({
  src: [
    {
      path: "../assets/fonts/DINNextW1G-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextW1G-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextW1G-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextW1G-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextW1G-Heavy.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-din-next",
  display: "swap",
});

export const geDinar = localFont({
  src: [
    {
      path: "../assets/fonts/GE-Dinar-One-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ge-dinar",
  display: "swap",
});

export const dinNextArabic = localFont({
  src: [
    {
      path: "../assets/fonts/DINNEXTLTARABIC-LIGHT-2-2.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextLTArabic-Regular-3.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/DINNextLTArabic-Medium-4.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/din-next-lt-w23-bold-1.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-din-next-arabic",
  display: "swap",
});
