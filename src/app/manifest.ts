import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "גביש - קהילת מנהלי הנוער של קרן רש״י",
    short_name: "גביש",
    description:
      "פורטל מקצועי לבוגרי תוכנית גביש - מנהלי מחלקות נוער ברשויות בישראל. תכנים, מחקרים, נתונים וקהילה.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "he",
    dir: "rtl",
    background_color: "#f4f7ec",
    theme_color: "#0f1e47",
    categories: ["education", "social", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
