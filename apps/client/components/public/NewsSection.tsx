"use client";
import Link from "next/link";
import Image from "next/image";
import { LuEye, LuMessageCircle, LuArrowRight } from "react-icons/lu";

const NEWS = [
  {
    id: 1,
    category: "University",
    date: "May 2, 2026",
    readTime: "5 min read",
    title: "KWASU RECORDS ANOTHER 100% ACCREDITATION SUCCESS",
    excerpt:
      "The National Universities Commission (NUC) has granted all 9 undergraduate programmes ...",
    emoji: "🏛️",
    bg: "linear-gradient(135deg, #1a4a2e, #2d6e47)",
    featured: true,
    img: "/news/campus.jpg",
    views: 1840,
    comments: 47,
    tags: ["accreditation", "NUC", "quality"],
  },
  {
    id: 2,
    category: "Innovation",
    date: "Apr 28, 2026",
    readTime: "3 min read",
    title: "KWASU Student Makes History with First Solo Flight",
    excerpt: "Teslimat Abiola Nurudeen, a final-year student ...",
    emoji: "⚡",
    bg: "linear-gradient(135deg, #2d3a1e, #4a5e2e)",
    featured: false,
    img: "/news/history-1.jpg",
    views: 976,
    comments: 22,
    tags: ["aviation", "student-success"],
  },
  {
    id: 3,
    category: "Academics",
    date: "Apr 20, 2026",
    readTime: "4 min read",
    title:
      "KWASU, CRC Credit Bureau Ltd. Strengthen Academia-Industry Relationship",
    excerpt: "The Vice-Chancellor reaffirmed the institution’s commitment ...",
    emoji: "🎓",
    bg: "linear-gradient(135deg, #1e2d4a, #2e3d6e)",
    featured: false,
    img: "/news/academic.jpg",
    views: 2150,
    comments: 68,
    tags: ["collaboration", "industry"],
  },
  {
    id: 4,
    category: "Leadership",
    date: "Apr 14, 2026",
    readTime: "2 min read",
    title:
      "V.C Shaykh-Luqman Jimoh presents Best Researcher and Best Staff awards",
    excerpt: "At the 66th Regular Meeting of Senate ...",
    emoji: "👨‍💼",
    bg: "linear-gradient(135deg, #4a2e1a, #6e4a2d)",
    featured: false,
    img: "/news/vc-portrait.jpg",
    views: 3520,
    comments: 91,
    tags: ["awards", "research"],
  },
];

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="absolute top-3.5 left-3.5 z-10 bg-gold-500 text-green-900 font-sans text-[10px] font-extrabold tracking-[0.12em] uppercase px-2.5 py-1 rounded">
      {label}
    </span>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}

export function NewsSection() {
  return (
    <section className="bg-cream-100 py-24 md:py-25 px-[clamp(20px,5vw,80px)]">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12 md:mb-14">
        <div>
          <span className="inline-block font-sans text-xs font-bold text-green-700 uppercase tracking-[0.2em] bg-green-100/70 px-3 py-1 rounded-full mb-3">
            Latest Updates
          </span>
          <h2 className="font-serif font-light text-[clamp(32px,4vw,54px)] leading-[1.1] text-green-900 tracking-tight">
            News &amp;{" "}
            <em className="italic font-semibold text-green-700">
              Announcements
            </em>
          </h2>
        </div>
        <Link
          href="/news"
          className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-green-700 transition-all hover:gap-2.5"
        >
          View All News
          <span className="inline-block transition-all group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr_1fr] gap-5">
        {NEWS.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
            className={`group/card block rounded-2xl overflow-hidden border border-cream-300 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-500
              ${item.featured ? "md:row-span-2" : ""}`}
          >
            <div
              className={`relative overflow-hidden ${item.featured ? "aspect-4/3" : "aspect-video"}`}
            >
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: item.bg }}
                >
                  <span className="text-[40px] md:text-[60px] opacity-80 select-none">
                    {item.emoji}
                  </span>
                </div>
              )}
              <CategoryBadge label={item.category} />
            </div>

            <div
              className={`${item.featured ? "px-5 py-6 md:px-7 md:py-8" : "px-5 py-4 md:px-6 md:py-5"}`}
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2.5 font-sans text-[11px] text-green-600 font-medium">
                <span>{item.date}</span>
                <span className="w-1 h-1 bg-green-500 rounded-full hidden sm:block" />
                <span className="hidden sm:inline">{item.readTime}</span>
                <span className="w-1 h-1 bg-green-500/50 rounded-full" />
                <span className="inline-flex items-center gap-1">
                  <LuEye className="w-3 h-3" />
                  {formatNumber(item.views)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <LuMessageCircle className="w-3 h-3" />
                  {formatNumber(item.comments)}
                </span>
              </div>

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-gold-500/10 text-gold-600 border border-gold-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3
                className={`font-serif font-semibold leading-snug text-green-900 tracking-tight
                  ${item.featured ? "text-[clamp(18px,1.8vw,26px)] mb-3 line-clamp-2" : "text-[17px] line-clamp-2"}`}
              >
                {item.title}
              </h3>

              {item.excerpt && (
                <p
                  className={`font-sans text-sm leading-relaxed text-green-700 ${item.featured ? "line-clamp-3" : "line-clamp-2"} mb-3`}
                >
                  {item.excerpt}
                </p>
              )}

              <span className="inline-flex items-center gap-1 text-gold-500 text-xs font-semibold mt-1 group-hover/card:gap-2 transition-all">
                Read more <LuArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
