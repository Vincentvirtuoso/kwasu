"use client";
import Link from "next/link";
import { LuGraduationCap, LuPlay } from "react-icons/lu";
import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-green-950)_0%,#0d2a1c_55%,#0a2018_100%)] pt-(--topbar-height)"
      style={{ minHeight: "100dvh" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_68%_52%,rgba(26,74,46,0.5)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[calc(100vh-var(--topbar-height))] px-[clamp(20px,5vw,80px)] py-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold-500/30 rounded-full bg-gold-500/10 mb-9 animate-[fade-up_0.7s_ease_both]">
            <span className="font-sans text-xs font-semibold text-gold-400 tracking-[0.18em] uppercase">
              Est. 2009 · Malete, Kwara State
            </span>
          </div>

          <h1 className="font-serif font-light text-[clamp(48px,5.8vw,88px)] leading-none text-white mb-7 tracking-[-0.02em] animate-[fade-up_0.7s_0.1s_ease_both]">
            Where <em className="italic font-semibold text-gold-400">Minds</em>
            <br />
            Meet <em className="italic font-semibold text-gold-300">Purpose</em>
          </h1>

          <p className="font-sans text-[clamp(15px,1.3vw,17px)] font-normal leading-relaxed text-white/55 max-w-115 mb-13 animate-[fade-up_0.7s_0.2s_ease_both]">
            Kwara State University is Nigeria&apos;s green university for
            community development, entrepreneurship, and research — shaping
            leaders who transform societies from the grassroots.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 animate-[fade-up_0.7s_0.3s_ease_both]">
            <Link
              href="/admissions"
              className="px-9 py-4 bg-gold-500 rounded-lg font-sans text-[15px] font-bold text-fg-inverted inline-flex items-center gap-2 transition-all duration-300 hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-gold"
            >
              Explore Admissions
            </Link>

            <button className="px-7 py-4 bg-transparent border border-white/20 rounded-lg font-sans text-[15px] font-medium text-white/75 inline-flex items-center gap-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/5">
              <LuPlay /> Virtual Tour
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center pl-10 animate-[fade-left_0.8s_0.35s_ease_both]">
          <div className="w-full max-w-130">
            <div className="w-full aspect-4/3 rounded-[20px] overflow-hidden border border-gold-500/20 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-green-800">
              <Image
                src="/kwasu-library.jpg"
                alt="KWASU Library"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
              <div className="flex justify-between px-8 py-2">
                <div className="w-20 h-20 bg-gold-500 rounded-full flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(201,168,76,0.45)] z-10">
                  <span className="font-sans text-[8px] font-bold text-green-900 text-center tracking-[0.08em] leading-[1.3] uppercase">
                    NUC Accredited ★★★★★
                  </span>
                </div>

                <div className="gba(7,24,16,0.95)] border border-gold-500/30 rounded-2xl p-4 backdrop-blur-[20px] flex items-center gap-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] z-10">
                  <div className="w-10 h-10 bg-gold-500/15 rounded-[10px] flex items-center justify-center text-lg">
                    <LuGraduationCap />
                  </div>
                  <div>
                    <div className="font-sans text-[10px] text-white/40 font-semibold tracking-[0.1em] uppercase">
                      Convocation
                    </div>
                    <div className="font-serif text-2xl font-semibold text-white leading-tight">
                      13th
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
