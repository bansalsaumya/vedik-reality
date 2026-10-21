import React, { useEffect } from 'react';

const DEFAULT_NAP = {
  name: "Vedik Realty",
  owners: "Deepak Lamba, Manish",
  address: "First Floor, Anandam Awaas, SCO-02, Sector 19, Dharuhera, Haryana – 123106",
  addressLocality: "Dharuhera",
  addressRegion: "Haryana",
  postalCode: "123106",
  addressCountry: "IN",
  phone: "+91 90538 48222",
  altPhone: "+91 97282 95353",
  email: "info.vedikrealty@gmail.com"
};

export default function SEO({
  title = "Vedik Realty | Property Dealer & Real Estate Agent in Dharuhera",
  description = "Vedik Realty is a real estate consultant in Dharuhera, Haryana, helping clients explore residential and commercial properties, flats, plots and property investment opportunities. Contact us for property enquiries and professional assistance.",
  keywords = "Plots for Sale in Dharuhera, Property Dealer in Dharuhera, Real Estate Agent in Dharuhera, Plots in Sector 19 Dharuhera, Plots in Sector 3 Dharuhera, Tulip City Dharuhera, Anandam Awaas Dharuhera, Anandam Estate Dharuhera, Residential Plots Dharuhera, Commercial Plots Dharuhera, Freehold Plots Dharuhera, Buy Plot in Dharuhera, House for Sale in Dharuhera, 2 BHK Flats Dharuhera, 3 BHK Flats Dharuhera, Property Investment in Dharuhera, Real Estate Consultant Dharuhera, Land for Sale in Dharuhera, Cheap Plots near Gurgaon, Property near NH 48 Dharuhera, Best Property Dealer in Sector 19 Dharuhera, SCO Commercial Shops Dharuhera, Plots near Bhiwadi, Plots near Rewari",
  url = typeof window !== 'undefined' ? window.location.href : 'https://vedikrealty.com',
  image = "https://vedikrealty.com/logo.png",
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

    // 4. JSON-LD Schema with Google Star Rating (AggregateRating) & Social Entity Linking
    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": DEFAULT_NAP.name,
      "image": image,
      "@id": "https://vedikrealty.com/#organization",
      "url": "https://vedikrealty.com",
      "telephone": `${DEFAULT_NAP.phone}, ${DEFAULT_NAP.altPhone}`,
      "email": DEFAULT_NAP.email,
      "priceRange": "₹₹ - ₹₹₹₹",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61594850518441",
        "https://www.instagram.com/vedik_realty/",
        "https://maps.app.goo.gl/bpCUi761odoyA34B7"
      ],
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
        "Dharuhera",
        "Sector 19 Dharuhera",
        "Sector 3 Dharuhera",
        "Sector 24 Dharuhera",
        "Delhi NCR",
        "Gurugram",
        "Bhiwadi",
        "Rewari District",
        "Manesar",
        "NH-48 Dharuhera",
        "Haryana"
      ],
      "knowsAbout": [
        "Plots for Sale in Dharuhera",
        "Property Dealer in Dharuhera",
        "Real Estate Agent in Dharuhera",
        "Plots in Sector 19 Dharuhera",
        "Plots in Sector 3 Dharuhera",
        "Tulip City Dharuhera Plots",
        "Anandam Awaas Dharuhera Plots",
        "Commercial Property in Dharuhera",
        "Freehold Residential Plots Dharuhera",
        "Real Estate Consultant Dharuhera Haryana"
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
      }
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
