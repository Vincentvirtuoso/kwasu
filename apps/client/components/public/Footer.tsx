"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  LuExternalLink,
  LuFacebook,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuPhoneCall,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";
import { BrandMark } from "@kwasu-portal/components";
import { cn } from "@kwasu-portal/utils-others";

// ─── Columns (now with icons) ──────────────────────────────
const COLS: {
  title: string;
  links: {
    label: string;
    href: string;
    icon?: ReactNode; // optional icon before the label
  }[];
}[] = [
  {
    title: "Academics",
    links: [
      { label: "Undergraduate", href: "/academics/undergraduate" },
      { label: "Postgraduate", href: "/academics/postgraduate" },
      { label: "Distance Learning", href: "/academics/distance" },
      { label: "Top-Up Degree", href: "/academics/topup" },
      { label: "Business School", href: "/academics/business" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Student Portal", href: "/login" },
      { label: "LMS / E-Learning", href: "/lms" },
      { label: "Library", href: "/library" },
      { label: "Academic Calendar", href: "/calendar" },
      { label: "Fee Payment", href: "/fees" },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "P.M.B 1530 Ilorin, 23431, Malete, Kwara State, Nigeria",
        href: "#",
      },
      {
        icon: <LuMail />,
        label: "info@kwasu.edu.ng",
        href: "mailto:info@kwasu.edu.ng",
      },
      {
        icon: <LuPhoneCall />,
        label: "+234 20803 20191 205699",
        href: "tel:+234 20803 20191 205699",
      },
      {
        label: "Get Directions",
        href: "https://www.google.com/maps?q=P.M.B+1530+Ilorin,+23431,+Malete,+Kwara+State,+Nigeria&um=1&ie=UTF-8&sa=X&ved=2ahUKEwiU9u-RoKn8AhW7aqQEHZaKBpgQ_AUoAXoECAEQAw",
        icon: <LuExternalLink className="w-3.5 h-3.5" />,
      },
    ],
  },
];

const SOCIALS = [
  {
    label: <LuTwitter />,
    href: "https://x.com/KwasuOfficial",
    title: "Twitter",
  },
  {
    label: <LuFacebook />,
    href: "https://m.facebook.com/KwasuUpdate/",
    title: "Facebook",
  },
  {
    label: <LuYoutube />,
    href: "https://www.youtube.com/@KwaraStateUniversityMalete",
    title: "YouTube",
  },
  {
    label: <LuInstagram />,
    href: "https://www.instagram.com/kwarastateuniversity",
    title: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="bg-green-900 pt-20 pb-10 px-[clamp(20px,5vw,80px)] border-t border-gold-500/12">
      <div className="grid grid-cols-1 gap-10 mb-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-14">
        {/* Brand */}
        <div>
          <BrandMark src="/kwasu-logo.png" />
          <p className="font-sans text-sm leading-relaxed text-white/40 mb-6">
            A leading institution of higher learning located in Malete, Kwara
            State. Empowering communities through education, research, and
            innovation since 2009.
          </p>

          <div className="flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.title}
                className="w-9 h-9 rounded-lg bg-white/7 border border-white/10 flex items-center justify-center text-white/55 text-sm font-bold transition-all duration-200 hover:bg-gold-500/15 hover:border-gold-400/40 hover:text-gold-400"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns with icons */}
        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-[11px] font-bold text-gold-500 tracking-[0.18em] uppercase mb-6">
              {col.title}
            </h3>
            <ul
              className="flex flex-col gap-3"
              style={{
                listStyle: col.title === "Contact" ? "none" : "initial",
                paddingLeft: col.title === "Contact" ? 0 : "var(--space-6)",
              }}
            >
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group font-sans text-sm text-white/45 hover:text-white/85 transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    {link.icon && (
                      <span className="shrink-0 text-current opacity-60 group-hover:opacity-100 transition-opacity">
                        {link.icon}
                      </span>
                    )}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/7">
        <span className="font-sans text-[13px] text-white/25">
          © 2026 Kwara State University. All rights reserved.
        </span>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
            <Link
              key={item}
              href="#"
              className="font-sans text-[13px] text-white/25 hover:text-white/55 transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
