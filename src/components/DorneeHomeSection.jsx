import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingModal from "./BookingModal";

gsap.registerPlugin(ScrollTrigger);

/**
 * DorneeHomeSection
 * Home page section introducing the Dornee womenswear atelier,
 * with a "Book Now" CTA that opens the consultation modal.
 *
 * npm i gsap @gsap/react react-icons
 * Fonts (add to your document head):
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600&family=Manrope:wght@400;500;600&family=Space+Mono&display=swap" rel="stylesheet" />
 */
export default function DorneeHomeSection() {
  const sectionRef = useRef(null);
  const swatchRef = useRef(null);
  const stitchRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Eyebrow, headline, copy, CTA reveal on scroll into view
        gsap.fromTo(
          "[data-reveal]",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );

        // Floating fabric swatch card — gentle ambient drift
        gsap.to(swatchRef.current, {
          y: -14,
          rotate: -2,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Signature stitch line draws itself in once visible
        const path = stitchRef.current;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F6F1EA] px-6 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Copy column */}
        <div>
          <p
            data-reveal
            className="font-['Space_Mono'] text-[11px] uppercase tracking-[0.3em] text-[#B76E79]"
          >
            Dornee — Womenswear Atelier
          </p>

          <h2
            data-reveal
            className="mt-5 font-['Fraunces'] text-[2.75rem] leading-[1.05] text-[#1C1A1B] sm:text-6xl"
          >
            Design, cut,
            <br />
            and fit —<span className="italic text-[#B76E79]"> for her.</span>
          </h2>

          <p
            data-reveal
            className="mt-6 max-w-md text-[15px] leading-relaxed text-[#1C1A1B]/70"
          >
            Dornee is a female-fashion design studio building considered,
            made-to-measure pieces from first sketch to final stitch. Every
            garment starts as a conversation and ends as something only
            you could wear.
          </p>

          <div data-reveal className="mt-10">
            <button
              onClick={() => setModalOpen(true)}
              className="group relative inline-flex items-center font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-[#1C1A1B]"
            >
              <span className="border border-[#1C1A1B] px-7 py-3.5 transition-colors duration-300 group-hover:bg-[#1C1A1B] group-hover:text-[#F6F1EA]">
                Book Now
              </span>
            </button>
            {/* Hand-drawn tacking-stitch underline — the section's signature mark */}
            <svg
              width="180"
              height="14"
              viewBox="0 0 180 14"
              fill="none"
              className="mt-1 hidden sm:block"
              aria-hidden="true"
            >
              <path
                ref={stitchRef}
                d="M2 8C20 2, 38 12, 56 6S92 2, 110 8s36 6, 68-2"
                stroke="#B76E79"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 5"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Visual column */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative h-[380px] w-[300px] sm:h-[440px] sm:w-[340px]">
            {/* Garment silhouette panel */}
            <div className="absolute inset-0 rounded-sm bg-[#402A3D]">
              <svg
                viewBox="0 0 200 260"
                className="absolute inset-0 h-full w-full opacity-80"
                fill="none"
              >
                <path
                  d="M100 20c-14 0-24 10-24 22 0 6 2 10 2 10l-38 18 10 34 24-10v130h52V114l24 10 10-34-38-18s2-4 2-10c0-12-10-22-24-22z"
                  stroke="#F6F1EA"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>

            {/* Floating fabric swatch card */}
            <div
              ref={swatchRef}
              className="absolute -bottom-6 -left-8 flex h-28 w-28 flex-col justify-between rounded-sm bg-[#F6F1EA] p-4 shadow-xl sm:h-32 sm:w-32"
            >
              <div className="h-full w-full rounded-[2px] bg-[#B76E79]" />
              <p className="mt-2 font-['Space_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#1C1A1B]/60">
                Swatch 04 · Rose
              </p>
            </div>

            {/* Accent frame */}
            <div className="pointer-events-none absolute -right-4 -top-4 h-full w-full rounded-sm border border-[#C9A66B]/60 sm:-right-6 sm:-top-6" />
          </div>
        </div>
      </div>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}