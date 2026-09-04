import React, { useEffect } from 'react';

const DEFAULT_NAP = {
  name: "Vedik Reality",
  owners: "Deepak Lamba, Manish",
  address: "First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106",
  addressLocality: "Dharuhera",
  addressRegion: "Haryana",
  postalCode: "123106",
  addressCountry: "IN",
  phone: "+91 90538 48222",
  altPhone: "+91 97282 95353",
  email: "Vedikrealty@gmail.com"
};

export default function SEO({
  title = "Vedik Reality | Property Dealer & Real Estate Agent in Dharuhera",
  description = "Vedik Reality is a real estate consultant in Dharuhera, Haryana, helping clients explore residential and commercial properties, flats, plots and property investment opportunities. Contact us for property enquiries and professional assistance.",
  keywords = "Real Estate Agent in Dharuhera, Property Dealer in Dharuhera, Properties for Sale in Dharuhera, Real Estate Company in Dharuhera, Property Consultant in Dharuhera, Flats for Sale in Dharuhera, Plots for Sale in Dharuhera, Commercial Property in Dharuhera, Sector 19 Dharuhera",
  url = typeof window !== 'undefined' ? window.location.href : 'https://vedik-reality.vercel.app',
  image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
  schemaType = "RealEstateAgent"
}) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (nameAttr, nameValue, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // 4. JSON-LD LocalBusiness / RealEstateAgent Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": DEFAULT_NAP.name,
      "image": image,
      "@id": "https://vedik-reality.vercel.app/#organization",
      "url": "https://vedik-reality.vercel.app",
      "telephone": DEFAULT_NAP.phone,
      "email": DEFAULT_NAP.email,
      "priceRange": "₹₹ - ₹₹₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "First Floor, Anandam Awaas, SCO-02, Sector 19",
        "addressLocality": "Dharuhera",
        "addressRegion": "Haryana",
        "postalCode": "123106",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.2045,
        "longitude": 76.7972
      },
      "areaServed": [
        { "@type": "City", "name": "Dharuhera" },
        { "@type": "AdministrativeArea", "name": "Rewari District" },
        { "@type": "AdministrativeArea", "name": "Sector 19 Dharuhera" },
        { "@type": "AdministrativeArea", "name": "Haryana" }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:30",
        "closes": "19:00"
      },
      "sameAs": [
        "https://facebook.com/vedikreality",
        "https://instagram.com/vedikreality"
      ]
    };

    let schemaScript = document.getElementById('jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'jsonld-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, url, image, schemaType]);

  return null;
}
