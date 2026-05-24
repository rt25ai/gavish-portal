import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gavish-portal.vercel.app"),
  title: {
    default: "גביש — קהילת מנהלי הנוער של קרן רש״י",
    template: "%s · גביש",
  },
  description:
    "פורטל מקצועי לבוגרי תוכנית גביש — מנהלי מחלקות נוער ברשויות בישראל. תכנים, מחקרים, נתונים וקהילה.",
  openGraph: {
    title: "גביש — קהילת מנהלי הנוער של קרן רש״י",
    description:
      "פורטל מקצועי לבוגרי תוכנית גביש. תכנים, מחקרים ונתונים על עולם הנוער בישראל.",
    locale: "he_IL",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${assistant.variable} antialiased`}
    >
      <body className="min-h-screen bg-paper text-ink font-body selection:bg-leaf-500/30 selection:text-navy-900">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
