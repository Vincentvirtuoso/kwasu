import Image from "next/image";

export function VCSection() {
  return (
    <section className="relative bg-green-900 overflow-hidden px-[clamp(20px,5vw,80px)] py-20 md:py-25">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(45,110,71,0.2) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20 items-center">
        <div className="relative">
          <div className="absolute left-0 md:-left-5 top-1/4 bottom-1/4 w-0.5 bg-linear-to-b from-transparent via-gold-500 to-transparent rounded-full hidden md:block" />

          <div className="relative w-full aspect-3.5/4 rounded-2xl overflow-hidden border border-gold-500/20 shadow-2xl">
            <Image
              src="/vice-chancellor.jpg"
              alt="Prof. Shaykh-Lukman Jimoh, Vice-Chancellor, Kwara State University"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-0.5 bg-gold-500 rounded-full" />
            <span className="font-sans text-[11px] font-bold text-gold-500 tracking-[0.2em] uppercase">
              Vice-Chancellor&apos;s Message
            </span>
          </div>

          <span
            className="font-serif text-[clamp(60px,6vw,100px)] leading-none text-gold-500/10 select-none -mb-2"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="font-serif italic font-light text-[clamp(18px,1.8vw,26px)] leading-relaxed text-white/90 mb-8">
            At KWASU, we do not merely educate — we cultivate purpose-driven
            individuals equipped to lead, innovate, and transform their
            communities from the grassroots up.
          </blockquote>

          <div className="flex items-center gap-4">
            <span className="w-12 h-px bg-gold-500" />
            <div>
              <p className="font-serif text-xl font-semibold text-gold-400">
                Prof. Shaykh-Lukman Jimoh
              </p>
              <p className="font-sans text-sm text-white/40 mt-0.5">
                Vice-Chancellor, Kwara State University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
