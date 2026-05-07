"use client";
import Link from "next/link";
import { UserPhoto } from "../common/UserPhoto";

const LECTURERS = [
  {
    name: "Prof. Olawale Mashood Aliyu",
    dept: "Postgraduate",
    specialization: "Dean, School of Postgraduate Studies",
    pubs: 42,
    exp: "18yr",
    image: "/deans/postgraduate-dean.jpg",
    bg: "linear-gradient(135deg, #1a4a2e, #2d6e47)",
  },
  {
    name: "Professor David Apata",
    dept: "Agriculture",
    specialization: "Dean, Faculty of Agriculture",
    pubs: 28,
    exp: "11yr",
    image: "/deans/agric-dean.jpg",
    bg: "linear-gradient(135deg, #2e1a4a, #4a2d6e)",
  },
  {
    name: "Prof. Yahya Duro Uthman Hambali",
    dept: "Law",
    specialization: "Dean, Faculty of Law",
    pubs: 35,
    exp: "22yr",
    image: undefined,
    bg: "linear-gradient(135deg, #1a2e4a, #2d4a6e)",
  },
  {
    name: "Prof. Ayodele Babatunde Omotoso",
    dept: "Health Sci.",
    specialization: "Provost, College of Health Sciences",
    pubs: 19,
    exp: "9yr",
    image: "/deans/ayodele.jpg",
    bg: "linear-gradient(135deg, #1a3d4a, #2d5c6e)",
  },
];

export function LecturersSection() {
  return (
    <section className="bg-cream-50 py-24 md:py-25 px-[clamp(20px,5vw,80px)]">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12 md:mb-14">
        <div>
          <span className="inline-block font-sans text-xs font-bold text-green-700 uppercase tracking-[0.2em] bg-green-100/70 px-3 py-1 rounded-full mb-3">
            Our People
          </span>
          <h2 className="font-serif font-light text-[clamp(32px,4vw,54px)] leading-[1.1] text-green-900 tracking-tight">
            Distinguished{" "}
            <em className="italic font-semibold text-green-700">Lecturers</em>
          </h2>
        </div>
        <Link
          href="/lecturers"
          className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-green-700 transition-all hover:gap-2.5"
        >
          View All Faculty
          <span className="inline-block transition-all group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {LECTURERS.map((lec) => (
          <div
            key={lec.name}
            className="group/card bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-xs transition-all duration-350 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:border-gold-500/40"
          >
            <UserPhoto
              src={lec.image}
              alt={lec.name}
              bg={lec.bg}
              badge={lec.dept}
            />

            <div className="p-5">
              <h3 className="font-serif text-[17px] font-semibold text-green-900 mb-1 leading-tight">
                {lec.name}
              </h3>
              <p className="font-sans text-xs text-green-700 leading-relaxed mb-4">
                {lec.specialization}
              </p>

              <div className="flex gap-5 pt-3.5 border-t border-cream-200">
                <div>
                  <span className="font-serif text-lg font-semibold text-green-700">
                    {lec.pubs}
                  </span>
                  <span className="block font-sans text-[9px] font-bold text-green-500 tracking-[0.1em] uppercase mt-0.5">
                    Pubs
                  </span>
                </div>
                <div>
                  <span className="font-serif text-lg font-semibold text-green-700">
                    {lec.exp}
                  </span>
                  <span className="block font-sans text-[9px] font-bold text-green-500 tracking-[0.1em] uppercase mt-0.5">
                    Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
