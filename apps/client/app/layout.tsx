import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  DM_Mono,
} from "next/font/google";
import Providers from "@/context/Providers";
import "@kwasu-portal/styles/css";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://portal.kwasu.edu.ng",
  ),
  title: {
    default: "KWASU Student Portal",
    template: "%s | KWASU Portal",
  },
  description:
    "Kwara State University Student Portal — courses, results, timetable, fees and more.",
  keywords: [
    "KWASU",
    "student portal",
    "Kwara State University",
    "courses",
    "results",
  ],
  authors: [{ name: "Kwara State University" }],
  robots: { index: false, follow: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "KWASU Student Portal",
    type: "website",
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d2818",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased text-fg-base">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
