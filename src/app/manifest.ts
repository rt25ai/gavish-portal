import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "גביש - קהילה מקצועית למנהלי מחלקות הנוער",
    short_name: "גביש",
    description:
      "קהילה מקצועית לומדת למנהלי מחלקות הנוער ברשויות בישראל. ביוזמת קרן רש״י ואיגוד מנהלי מחלקות הנוער.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: "he",
    dir: "rtl",
    background_color: "#f4f7ec",
    theme_color: "#254590",
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
