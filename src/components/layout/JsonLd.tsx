export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: "Fluff N' Woof Veterinary Hospital",
    alternateName: "فلف أن ووف",
    url: "https://fluffnwoof.sa",
    logo: "https://fluffnwoof.sa/images/logo.png",
    image: "https://fluffnwoof.sa/images/logo.png",
    telephone: "+966534429329",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prince Abdullah bin Saud Street, Al Qayrawan",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh",
      addressCountry: "SA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "23:59",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Tuesday",
        opens: "12:00",
        closes: "23:59",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "16:00",
        closes: "23:59",
      },
    ],
    sameAs: [
      "https://instagram.com/fluffnwoof",
      "https://twitter.com/fluffnwoof",
      "https://tiktok.com/@fluffnwoof",
    ],
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "600",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Veterinary Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Veterinary Surgery" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Veterinary Clinic" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pet Vaccination" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pet Grooming" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pet Hotel / Boarding" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lab & Radiology" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pet Transportation" } },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
