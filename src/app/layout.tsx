import type { Metadata } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { AccessibilityWidget } from "@/components/a11y/accessibility-widget";

const A11Y_INIT_SCRIPT = `
try {
  var raw = localStorage.getItem('gavish-a11y-state');
  if (raw) {
    var s = JSON.parse(raw);
    var html = document.documentElement;
    var map = {
      readableFont: 'a11y-readable-font',
      highlightLinks: 'a11y-highlight-links',
      highlightHeadings: 'a11y-highlight-headings',
      highContrast: 'a11y-high-contrast',
      blackYellow: 'a11y-black-yellow',
      invert: 'a11y-invert',
      sepia: 'a11y-sepia',
      monochrome: 'a11y-monochrome',
      bigCursor: 'a11y-big-cursor',
      blackCursor: 'a11y-black-cursor',
      pauseAnimations: 'a11y-pause-animations',
      keyboardNav: 'a11y-keyboard-nav'
    };
    Object.keys(map).forEach(function(k){ if (s[k]) html.classList.add(map[k]); });
    if (typeof s.fontSize === 'number' && s.fontSize !== 0) {
      html.style.setProperty('--a11y-font-scale', String(1 + s.fontSize * 0.1));
      html.classList.add('a11y-font-scaled');
    }
  }
} catch (e) {}
`;

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
    default: "גביש - קהילת מנהלי הנוער של קרן רש״י",
    template: "%s · גביש",
  },
  description:
    "פורטל מקצועי לבוגרי תוכנית גביש - מנהלי מחלקות נוער ברשויות בישראל. תכנים, מחקרים, נתונים וקהילה.",
  openGraph: {
    title: "גביש - קהילת מנהלי הנוער של קרן רש״י",
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
        <script dangerouslySetInnerHTML={{ __html: A11Y_INIT_SCRIPT }} />
        <SmoothScrollProvider>
          <div className="a11y-page-content">{children}</div>
        </SmoothScrollProvider>
        <AccessibilityWidget />
      </body>
    </html>
  );
}
