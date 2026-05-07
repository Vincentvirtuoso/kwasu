import type { Metadata } from "next";
import { Navbar } from "@/components/public/Navbar";
import { HeroSection } from "@/components/public/HeroSection";
import { StatsStrip } from "@/components/public/StatsStrip";
import { PortalStrip } from "@/components/public/PortalStrip";
import { NewsSection } from "@/components/public/NewsSection";
import { VCSection } from "@/components/public/VCSection";
import { LecturersSection } from "@/components/public/LecturersSection";
import { GraduatesSection } from "@/components/public/GraduatesSection";
import { RadioSection } from "@/components/public/RadioSection";
import { Footer } from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "KWASU — Kwara State University | The Green University",
  description:
    "Kwara State University — Nigeria's green university for community development, entrepreneurship and research. Est. 2009, Malete, Kwara State.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StatsStrip />
        <PortalStrip />
        <NewsSection />
        <VCSection />
        <LecturersSection />
        <GraduatesSection />
        <RadioSection />
      </main>

      <Footer />
    </>
  );
}
