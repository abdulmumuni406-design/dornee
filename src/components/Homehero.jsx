import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Parallax, EffectCreative } from "swiper/modules";
import d8 from "../assets/d8.jpg";
import d1 from "../assets/d1.jpg";
import d16 from "../assets/d16.jpg";
import d4 from "../assets/d4.jpg";

const slides = [
     {
    image: d8,
    badge: "Attention stealing",
    title: "Chic style, bold presence",
    text: "Welcome to Dornee Atelier! We're thrilled to have you here. Explore our collection and discover something special.",
  },
  {
    image: d1,
    badge: "Luxury stays",
    title: "Discover the Extraordinary",
    text: "A premium escape designed to feel elegant, calm, and unforgettable.",
  },
  {
    image: d16,
    badge: "Elegant design",
    title: "Escape to Paradise",
    text: "Soft motion, rich atmosphere, and a bold visual story from the first glance.",
  },
 
  {
    image: d4,
    badge: "Premium vibe",
    title: "Paradise Starts Here",
    text: "A hero section that moves with depth, elegance, and serious presence.",
  },
];
console.log(slides);
const Homehero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[75vh] md:h-[65vh] w-full overflow-hidden bg-black lg:h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Parallax, EffectCreative]}
        slidesPerView={1}
        loop
        speed={1400}
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
            opacity: 0,
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        parallax={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={`${slide.title}-${index}`}>
              <div className="relative h-[80vh] w-full overflow-hidden lg:h-screen">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2200ms] ease-out ${
                    isActive ? "scale-110" : "scale-125"
                  }`}
                  data-swiper-parallax-scale="1.2"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_45%)]" />

                <div className="relative z-10 flex h-full items-center">
                  <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                    <div className="max-w-3xl text-white">
                      <h1
                        className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl"
                        data-swiper-parallax="-500"
                      >
                        {slide.title}
                      </h1>

                      <p
                        className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg lg:text-xl"
                        data-swiper-parallax="-650"
                      >
                        {slide.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Homehero;