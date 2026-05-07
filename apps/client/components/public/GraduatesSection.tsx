"use client";
import Link from "next/link";
import { UserPhoto } from "../common/UserPhoto";
import { useState } from "react";

interface Graduate {
  rank?: number;
  name: string;
  dept: string;
  cgpa: string;
  image?: string;
  note?: string;
}

const GRADUATES_BY_YEAR: Record<string, Graduate[]> = {
  "2022/2023": [
    {
      rank: 1,
      name: "Zainab Abdulganiyu",
      dept: "Plant Biology",
      cgpa: "4.97",
      image: "/graduates/zainab.jpg",
    },
    {
      rank: 2,
      name: "Adnan Sadeeq Abubakar",
      dept: "Engineering",
      cgpa: "4.88",
      image: "/graduates/adnan.jpg",
    },
    {
      rank: 3,
      name: "Oluwatosin Oroma Ajayi",
      dept: "Engineering",
      cgpa: "4.85",
      image: "/graduates/tosin.jpg",
    },
    {
      rank: 4,
      name: "Jamiu Bushra Ayegbami",
      dept: "Engineering",
      cgpa: "4.82",
      image: "/graduates/jamiu.jpg",
    },
  ],
  "2023/2024": [
    {
      rank: 1,
      name: "Awode Afekhe Emmanuel",
      dept: "Biochemistry",
      cgpa: "4.97",
      image: "/graduates/awode.jpg",
    },
    {
      rank: 2,
      name: "Olamide Victoria Abolarin",
      dept: "English",
      cgpa: "4.81",
      image: "/graduates/olamide.jpg",
    },
    {
      rank: 3,
      name: "Deborah Ayoolamide Fasina",
      dept: "English",
      cgpa: "4.76",
      image: "/graduates/deborah.jpg",
    },
    {
      rank: 4,
      name: "Mujab Olayinka Daoud",
      dept: "Computer Science",
      cgpa: "4.72",
      image: "/graduates/mujab.jpg",
    },
  ],
  "2024/2025": [
    {
      rank: 1,
      name: "Oluwatimilehin M. Ayeni",
      dept: "Mechanical Engineering",
      cgpa: "4.92",
      image: "/graduates/ayeni.jpg",
    },
    {
      rank: 2,
      name: "Fatiu Oladosu",
      dept: "Linguistics/Yoruba",
      cgpa: "4.85",
      image: "/graduates/fatiu.jpg",
    },
    {
      rank: 3,
      name: "Aminat Damilola Ahmad",
      dept: "Microbiology",
      cgpa: "4.80",
      image: "/graduates/aminat.jpg",
    },
    {
      rank: 4,
      name: "Emmanuel Tomisin Bello",
      dept: "Microbiology",
      cgpa: "4.78",
      image: "/graduates/emmanuel.jpg",
    },
  ],
  "2025/2026": [
    {
      rank: 1,
      name: "To be announced",
      dept: "TBD",
      cgpa: "TBD",
      note: "Academic Session Ongoing",
    },
    // Repeat placeholders as needed
  ],
};

const YEARS = Object.keys(GRADUATES_BY_YEAR).reverse(); // newest first

function GraduateCard({ g }: { g: Graduate }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-gold-500/40 cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-linear-to-b from-green-950 to-green-900">
        <UserPhoto alt={g.name} src={g.image} />
        {g.rank && (
          <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center font-sans text-xs font-extrabold text-green-900 shadow-gold">
            {g.rank}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-sm font-semibold text-white mb-0.5 line-clamp-2">
          {g.name}
        </h3>
        <p className="font-sans text-[11px] text-white/40 mb-4 line-clamp-1">
          {g.dept}
        </p>

        {g.note ? (
          <div className="pt-3 border-t border-white/10">
            <span className="font-sans text-xs font-medium text-gold-400 uppercase tracking-wider">
              {g.note}
            </span>
          </div>
        ) : (
          <div className="flex items-end gap-px pt-3 border-t border-white/10 place-content-end">
            <span className="font-serif text-2xl font-bold text-gold-400 -mb-1.5">
              {g.cgpa}
            </span>
            <span className="font-sans text-[10px] text-white/35 uppercase tracking-tight">
              / 5.0
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function GraduatesSection() {
  const [activeYear, setActiveYear] = useState(YEARS[0]);
  const graduates = GRADUATES_BY_YEAR[activeYear] || [];

  return (
    <section className="relative bg-green-900 py-24 md:py-25 px-[clamp(20px,5vw,80px)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_60%_at_15%_80%,rgba(201,168,76,0.05)_0%,transparent_55%)]" />

      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 mb-12 md:mb-14">
        <div>
          <div className="flex items-center gap-2.5 mb-4 font-sans text-[11px] font-bold text-gold-500 tracking-[0.2em] uppercase">
            <span className="block w-6 h-0.5 bg-gold-500 rounded-full" />
            Hall of Excellence
          </div>
          <h2 className="font-serif font-light text-[clamp(32px,4vw,54px)] leading-[1.1] text-white tracking-tight">
            Best{" "}
            <em className="italic font-semibold text-gold-400">Graduating</em>{" "}
            Students
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {YEARS.map((yr) => (
            <button
              key={yr}
              onClick={() => setActiveYear(yr)}
              className={`px-4 py-2 rounded-full font-sans text-[13px] font-medium transition-all duration-200
                ${
                  activeYear === yr
                    ? "bg-gold-500 text-green-900 shadow-gold"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
            >
              {yr.replace(" (Upcoming)", "")}
              {yr.includes("Upcoming") && (
                <span className="ml-1 text-gold-400">*</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {graduates.map((g, idx) => (
          <GraduateCard g={g} key={idx} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/graduates"
          className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-white/60 hover:text-white transition-colors"
        >
          View all convocation results{" "}
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
