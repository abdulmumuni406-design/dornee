import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiX, FiCheck } from "react-icons/fi";

/**
 * BookingModal
 * Fashion-atelier consultation booking form.
 *
 * npm i gsap @gsap/react react-icons
 *
 * Usage:
 *   <BookingModal open={isOpen} onClose={() => setIsOpen(false)} />
 */
export default function BookingModal({ open, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const checkRef = useRef(null);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Custom Design",
    date: "",
    notes: "",
  });

  // Reset internal state whenever the modal is closed
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "Custom Design",
          date: "",
          notes: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useGSAP(() => {
    if (!overlayRef.current || !panelRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(overlayRef.current, { display: "flex" })
        .fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        )
        .fromTo(
          panelRef.current,
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45 },
          "-=0.15"
        )
        .fromTo(
          panelRef.current.querySelectorAll("[data-field]"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.045 },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = "";
      gsap.to(panelRef.current, {
        opacity: 0,
        y: 16,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        delay: 0.05,
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [open]);

  useGSAP(() => {
    if (!submitted || !checkRef.current) return;
    const path = checkRef.current;
    const length = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );
  }, [submitted]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Wire this up to your booking endpoint / CRM.
    console.log("Dornee booking request:", form);
    setSubmitted(true);
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dornee-booking-title"
      className="fixed inset-0 z-50 hidden items-center justify-center bg-[#1C1A1B]/70 backdrop-blur-sm px-4 py-8"
      onMouseDown={(e) => e.target === overlayRef.current && onClose?.()}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-md rounded-sm bg-[#F6F1EA] shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close booking form"
          className="absolute right-5 top-5 text-[#1C1A1B]/50 transition-colors hover:text-[#1C1A1B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79] rounded-full"
        >
          <FiX size={22} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="px-8 py-10 sm:px-10">
            <p
              data-field
              className="font-['Space_Mono'] text-[11px] uppercase tracking-[0.25em] text-[#B76E79]"
            >
              Atelier Booking
            </p>
            <h2
              id="dornee-booking-title"
              data-field
              className="mt-2 font-['Fraunces'] text-3xl leading-tight text-[#1C1A1B]"
            >
              Reserve your consultation
            </h2>
            <p data-field className="mt-2 text-sm text-[#1C1A1B]/60">
              Tell us a little about you — we'll follow up within one
              business day to confirm your fitting.
            </p>

            <div className="mt-7 space-y-5">
              <div data-field>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ama Owusu"
                  className="w-full border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] placeholder:text-[#1C1A1B]/30 focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div data-field>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="w-full border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] placeholder:text-[#1C1A1B]/30 focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                  />
                </div>
                <div data-field>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="024 000 0000"
                    className="w-full border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] placeholder:text-[#1C1A1B]/30 focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div data-field>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                  >
                    <option>Custom Design</option>
                    <option>Fitting Consultation</option>
                    <option>Personal Styling</option>
                    <option>Alterations</option>
                  </select>
                </div>
                <div data-field>
                  <label
                    htmlFor="date"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                  >
                    Preferred date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                  />
                </div>
              </div>

              <div data-field>
                <label
                  htmlFor="notes"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-[#1C1A1B]/60"
                >
                  Notes (optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Occasion, fabric preferences, inspiration…"
                  className="w-full resize-none border-0 border-b border-[#1C1A1B]/20 bg-transparent pb-2 text-[#1C1A1B] placeholder:text-[#1C1A1B]/30 focus:border-[#B76E79] focus:outline-none focus:ring-0 transition-colors"
                />
              </div>
            </div>

            <button
              data-field
              type="submit"
              className="mt-8 w-full bg-[#1C1A1B] py-3.5 font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-[#F6F1EA] transition-colors hover:bg-[#402A3D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F6F1EA]"
            >
              Confirm request
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center px-8 py-16 text-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              className="mb-5"
            >
              <circle cx="28" cy="28" r="27" stroke="#B76E79" strokeWidth="1.5" />
              <path
                ref={checkRef}
                d="M17 29L24.5 36.5L39.5 20"
                stroke="#B76E79"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <h3 className="font-['Fraunces'] text-2xl text-[#1C1A1B]">
              Request received
            </h3>
            <p className="mt-2 max-w-xs text-sm text-[#1C1A1B]/60">
              Thank you, {form.name.split(" ")[0] || "there"}. Our studio
              team will reach out shortly to confirm your appointment.
            </p>
            <button
              onClick={onClose}
              className="mt-8 font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-[#1C1A1B] underline decoration-[#B76E79] underline-offset-4 hover:text-[#B76E79]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}