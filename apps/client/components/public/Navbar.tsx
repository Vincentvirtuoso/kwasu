"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BrandMark } from "@kwasu-portal/components";
import { ThemeToggle } from "../common/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Campus Life", href: "/campus-life" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="kwasu-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-fixed)",
        height: "var(--topbar-height)",
        display: "flex",
        alignItems: "center",
        padding: "0 clamp(20px, 5vw, 80px)",
        background: scrolled
          ? "rgba(7, 24, 16, 0.98)"
          : "rgba(7, 24, 16, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.2)"
          : "1px solid rgba(255,255,255,0.04)",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <BrandMark src="/kwasu-logo.png" />
      </Link>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          marginLeft: "auto",
          marginRight: 32,
        }}
        className="hide-mobile"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-gold-400)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.65)")
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div
        style={{ display: "flex", alignItems: "center", gap: 10 }}
        className="hide-mobile"
      >
        <Link
          href="/admissions"
          style={{
            padding: "8px 18px",
            border: "1px solid rgba(201,168,76,0.45)",
            borderRadius: 6,
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-gold-400)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,168,76,0.1)";
            e.currentTarget.style.borderColor = "var(--color-gold-400)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(201,168,76,0.45)";
          }}
        >
          Apply Now
        </Link>

        <Link
          href="/login"
          style={{
            padding: "8px 18px",
            background: "var(--color-gold-500)",
            borderRadius: 6,
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 700,
            color: "var(--color-green-900)",
            textDecoration: "none",
            transition: "all 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-gold-300)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--color-gold-500)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Student Portal <span>→</span>
        </Link>
      </div>

      <button
        className="show-mobile-only"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 24,
          cursor: "pointer",
          padding: 8,
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--topbar-height)",
            left: 0,
            right: 0,
            // background: "var(--color-green-950)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
            padding: "20px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: "var(--z-fixed)",
            animation: "fade-down 0.2s ease both",
          }}
          className="bg-fg-on-gold show-mobile-only"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 500,
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Link
              href="/admissions"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px",
                border: "1px solid rgba(201,168,76,0.4)",
                borderRadius: 8,
                color: "var(--color-gold-400)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Apply Now
            </Link>
            <Link
              href="/login"
              style={{
                flex: 1,
                textAlign: "center",
                padding: "12px",
                background: "var(--color-gold-500)",
                borderRadius: 8,
                color: "var(--color-green-900)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Student Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
