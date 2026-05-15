import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "wouter";
import { motion, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = lazy(() => import("@/components/HeroCanvas"));
const DecorCanvas = lazy(() => import("@/components/DecorCanvas"));

const services = [
  { name: "Wedding Planning", desc: "From vision to reality — every detail orchestrated with precision and care." },
  { name: "Luxury Wedding Decor", desc: "Bespoke environments crafted from the finest materials and floral artistry." },
  { name: "Floral Styling", desc: "Living sculptures of bloom, fragrance, and texture that define a space." },
  { name: "Mandap Design", desc: "Sacred ceremonial spaces elevated into architectural masterpieces." },
  { name: "Engagement Decor", desc: "Intimate celebrations adorned with warmth, softness, and intention." },
  { name: "Reception Styling", desc: "Grand, luminous evenings designed to be felt long after the last dance." },
  { name: "Royal Theme Weddings", desc: "The grandeur of Indian royalty, reimagined for the modern celebration." },
  { name: "Wedding Stage Design", desc: "Statement stages that command presence and frame every photograph." },
  { name: "Bridal Entry Concepts", desc: "Arrivals so breathtaking, every guest will pause in silence." },
  { name: "Custom Event Styling", desc: "Singular creative vision applied to every facet of your celebration." },
];

const themes = [
  { name: "Rajasthani Royal", sub: "Desert gold & palace grandeur" },
  { name: "Mughal Garden", sub: "Symmetry, blooms & marble luxury" },
  { name: "Contemporary Luxe", sub: "Editorial precision meets warmth" },
  { name: "Temple Floristry", sub: "Sacred devotion meets living art" },
  { name: "Nawabi Elegance", sub: "Lucknow courts & chikan refinement" },
];

const stories = [
  { couple: "Priya & Arjun", date: "March 2024", location: "Udaipur, Rajasthan", theme: "Royal Palace" },
  { couple: "Meera & Rohit", date: "January 2024", location: "Goa", theme: "Coastal Elegance" },
  { couple: "Ananya & Vikram", date: "November 2023", location: "Jaipur Palace", theme: "Mughal Garden" },
];

const testimonials = [
  { text: "Alankaran turned our dream into reality. Every detail was beyond what we imagined.", client: "Priya & Arjun", location: "Udaipur" },
  { text: "The mandap design was breathtaking. Our guests are still talking about it months later.", client: "Meera & Rohit", location: "Goa" },
  { text: "From the first consultation to the last petal, the attention to detail was extraordinary.", client: "Ananya & Vikram", location: "Jaipur" },
];

// Luxury image blocks
function WeddingImage({ image, aspectClass = "aspect-[4/5]", label = "" }: { image: string; aspectClass?: string; label?: string }) {
  return (
    <div className={`${aspectClass} relative overflow-hidden bg-muted`}>
      <img src={image} alt={label || "Wedding Decor"} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 flex items-end p-4 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)" }}>
        {label && <span className="section-label text-white/90">{label}</span>}
      </div>
    </div>
  );
}

const images = [
  "/images/royal_mandap.webp",
  "/images/coastal_wedding.webp",
  "/images/mughal_garden.webp",
  "/images/floral_stage.webp",
  "/images/bridal_entry.webp",
  "/images/engagement_decor.webp",
  "/images/grand_reception.webp",
  "/images/floral_detail.webp",
];

// Lazy-load all non-hero images; hero uses fetchpriority="high" separately
const LAZY = "lazy" as const;
const EAGER = "eager" as const;

const videos = [
  "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-kissing-under-a-floral-arch-44167-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-holding-hands-and-walking-in-a-park-44169-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-groom-and-bride-having-a-romantic-moment-44155-large.mp4",
];

export default function Home() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [decorMouseX, setDecorMouseX] = useState(0);
  const [decorMouseY, setDecorMouseY] = useState(0);

  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });
  const heroMoveX = useTransform(springX, [-1, 1], [-18, 18]);
  const heroMoveY = useTransform(springY, [-1, 1], [-10, 10]);

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseX(x);
      setMouseY(y);
      springX.set(x);
      springY.set(y);
    };
    window.addEventListener("mousemove", onMouse);
    return () => window.removeEventListener("mousemove", onMouse);
  }, [springX, springY]);

  useEffect(() => {
    if (!servicesRef.current) return;
    const cards = servicesRef.current.querySelectorAll(".service-card");
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: servicesRef.current, start: "top 80%", once: true }
      }
    );
  }, []);

  useEffect(() => {
    if (!aboutRef.current) return;
    gsap.fromTo(aboutRef.current.querySelectorAll(".reveal-text"),
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: aboutRef.current, start: "top 75%", once: true }
      }
    );
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <SEO 
        title="Luxury Event Styling & Floral Design" 
        description="Alankaran creates luxurious wedding decor, floral styling, and immersive celebrations inspired by Indian heritage, romance, and modern editorial beauty."
      />
      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* On mobile: static hero image (avoids loading ~600KB Three.js on mobile)
            On desktop: interactive 3D canvas */}
        <div className="absolute inset-0 z-0">
          {/* LCP element — WebP with PNG fallback, responsive srcset */}
          <picture>
            <source
              srcSet="/images/hero-couple.webp"
              type="image/webp"
            />
            <img
              src="/images/hero-couple.png"
              alt="Cinematic luxury wedding couple — Alankaran Events"
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
              decoding="sync"
              width={1200}
              height={800}
            />
          </picture>
          <Suspense fallback={null}>
            <HeroCanvas mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
          </Suspense>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 80%), linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0 bg-black/30 z-10"
        />

        {/* Side labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-24 z-20 opacity-40">
          <span className="section-label -rotate-90 origin-center whitespace-nowrap text-[7px] tracking-[0.5em]">LUXURY</span>
          <span className="section-label -rotate-90 origin-center whitespace-nowrap text-[7px] tracking-[0.5em]">ELEGANCE</span>
          <span className="section-label -rotate-90 origin-center whitespace-nowrap text-[7px] tracking-[0.5em]">CRAFTSMANSHIP</span>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            className="flex items-center justify-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px w-8 bg-gold/40" />
            <span className="section-label text-gold/80 text-[10px] tracking-[0.4em]">✦ EST. 2015 - INDIA ✦</span>
            <div className="h-px w-8 bg-gold/40" />
          </motion.div>

          <motion.h1
            className="text-display text-5xl md:text-7xl lg:text-[6.5rem] text-white mb-8"
            style={{ x: heroMoveX, y: heroMoveY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting Timeless
            <br />
            <span className="font-script italic text-gold-gradient normal-case text-[1.2em] -mt-4 block lg:inline-block">Luxury</span> Weddings
          </motion.h1>

          <motion.p
            className="text-body max-w-2xl mx-auto text-base md:text-lg mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Alankaran creates luxurious wedding decor, floral styling, and immersive celebrations inspired by Indian heritage, romance, and modern editorial beauty.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 bg-gold text-background font-sans font-medium tracking-widest text-xs uppercase hover:bg-gold/90 hover:gold-glow transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid="btn-plan-celebration"
              >
                Plan Your Wedding
              </motion.button>
            </Link>
            <Link href="/wedding-stories">
              <motion.button
                className="px-8 py-4 border border-gold/50 text-gold font-sans font-medium tracking-widest text-xs uppercase hover:bg-gold/10 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                data-testid="btn-explore-weddings"
              >
                Explore Stories
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="section-label text-[10px] opacity-80">Scroll</span>
          <p className="font-serif italic text-xs text-gold/60 tracking-widest uppercase">Timeless Elegance</p>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ─── LUXURY SHOWCASE ─── */}
      <section className="py-24 lg:py-32 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 relative">
          <div className="col-span-1 space-y-3">
            <WeddingImage image={images[0]} aspectClass="aspect-[3/4]" />
            <WeddingImage image={images[4]} aspectClass="aspect-square" />
          </div>
          <div className="col-span-1 space-y-3 mt-12">
            <WeddingImage image={images[1]} aspectClass="aspect-[4/5]" />
            <WeddingImage image={images[5]} aspectClass="aspect-[3/4]" />
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col justify-center items-start px-4 md:px-8">
            <p className="section-label mb-4 text-gold">Our Work</p>
            <h2 className="text-display text-5xl lg:text-7xl mb-6">
              Crafted<br />With<br /><em className="not-italic text-gold-gradient">Intention</em>
            </h2>
            <p className="font-sans font-light text-muted-foreground text-sm leading-relaxed mb-6">
              Every arrangement, every fabric drape, every candlelit moment — chosen with deliberate creative intent.
            </p>
            <div className="w-12 h-px bg-current opacity-20" />
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="h-px" style={{ background: "hsl(45 30% 80%)" }} />
      </div>

      {/* ─── ABOUT PREVIEW ─── */}
      <section ref={aboutRef} className="py-24 lg:py-36 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-6 reveal-text text-gold">Our Philosophy</p>
            <h2 className="text-display text-4xl lg:text-6xl mb-8 reveal-text">
              Where Heritage Meets<br />
              <em className="not-italic text-gold-gradient">Modern Romance</em>
            </h2>
            <Link href="/about">
              <motion.button
                className="reveal-text mt-4 px-8 py-3 border border-gold text-gold section-label hover:bg-gold hover:text-background hover:gold-glow transition-all"
                whileHover={{ scale: 1.02 }}
                data-testid="btn-our-story"
              >
                Our Story
              </motion.button>
            </Link>
          </div>
          <div className="space-y-6">
            {[
              "Every celebration is composed like a work of art.",
              "Florals, textures, rituals, and spaces are designed into one cinematic experience.",
              "From intimate ceremonies to grand royal weddings, every detail is curated with grace.",
              "We don't decorate spaces — we compose experiences.",
            ].map((text, i) => (
              <div key={i} className="reveal-text">
                <div className="h-px mb-4" style={{ background: "hsl(45 30% 80%)" }} />
                <p className="text-quote text-lg lg:text-xl text-foreground">
                  &ldquo;{text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-luxury-gradient opacity-50 z-0" />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-gold justify-center">What We Do</p>
            <h2 className="text-display text-4xl lg:text-6xl">Signature Services</h2>
          </div>
          <div
            ref={servicesRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.name}
                className="service-card glass-card p-5 cursor-pointer opacity-0 group relative overflow-hidden transition-colors hover:border-gold/60"
                whileHover={{ y: -6, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
                transition={{ duration: 0.3 }}
                data-testid={`card-service-${i}`}
              >
                <div className="text-gold/20 font-serif text-4xl absolute top-2 right-4 group-hover:text-gold/40 transition-colors">
                  0{i + 1}
                </div>
                <div
                  className="w-full aspect-[4/3] mb-4 relative z-10"
                  style={{ backgroundImage: `url(${images[i % images.length]})`, backgroundSize: "cover", backgroundPosition: "center" }}
                />
                <h3 className="font-serif text-lg mb-2 text-white">{s.name}</h3>
                <p className="text-body text-[13px]">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <motion.button
                className="px-10 py-4 border border-gold text-gold section-label hover:bg-gold hover:text-background transition-all"
                whileHover={{ scale: 1.02 }}
                data-testid="btn-all-services"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ROYAL THEMES ─── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="section-label mb-4 justify-center text-gold">Collections</p>
          <h2 className="text-display text-4xl lg:text-6xl text-center mb-16">Royal Wedding Themes</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
            {themes.map((t, i) => (
              <motion.div
                key={t.name}
                className="flex-none snap-center w-72 md:w-80"
                whileHover={{ scale: 1.02 }}
                data-testid={`card-theme-${i}`}
              >
                <div
                  className="aspect-[3/4] relative overflow-hidden"
                  style={{ backgroundImage: `url(${images[(i + 2) % images.length]})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    style={{ background: "linear-gradient(to top, hsl(150 15% 10% / 0.7) 0%, transparent 60%)" }}
                  >
                    <h3 className="font-serif text-2xl text-white mb-1">{t.name}</h3>
                    <p className="font-sans text-xs text-white/70" style={{ fontWeight: 300 }}>{t.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="h-px" style={{ background: "hsl(45 30% 80%)" }} />
      </div>

      {/* ─── 3D DECOR EXPERIENCE ─── */}
      <section className="py-24 lg:py-36">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-4 text-gold">Immersive Design</p>
              <h2 className="text-display text-4xl lg:text-6xl mb-6">
                Experience the<br />
                <em className="not-italic text-gold-gradient">Extraordinary</em>
              </h2>
              <p className="text-body text-sm mb-8 max-w-md">
                Our design process is tactile, immersive, and deeply considered. Every material is chosen not just to be seen, but to be felt.
              </p>
              <Link href="/services">
                <motion.button
                  className="px-8 py-3 border border-gold text-gold section-label hover:bg-gold hover:text-background hover:gold-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                  data-testid="btn-discover-services"
                >
                  Discover Our Process
                </motion.button>
              </Link>
            </div>
            <div
              className="h-96 lg:h-[500px]"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setDecorMouseX((e.clientX - rect.left) / rect.width * 2 - 1);
                setDecorMouseY((e.clientY - rect.top) / rect.height * 2 - 1);
              }}
            >
              <Suspense fallback={<div className="w-full h-full img-placeholder" />}>
                <DecorCanvas mouseX={decorMouseX} mouseY={decorMouseY} isMobile={isMobile} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CINEMATIC IMAGE GRID ─── */}
      <section className="py-12 lg:py-20 bg-muted/20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {/* Row 1: wide + tall stack */}
            <div className="col-span-2 relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img src={images[1]} alt="Luxury wedding moment" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="col-span-1 flex flex-col gap-2 md:gap-3">
              <div className="relative overflow-hidden flex-1">
                <img src={images[2]} alt="Mughal garden wedding" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="relative overflow-hidden flex-1">
                <img src={images[3]} alt="Floral stage design" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            {/* Row 2: new detail image + wide */}
            <div className="col-span-1 relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img src="/images/mandap_floral_detail.webp" alt="Mandap floral detail" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="col-span-2 relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <img src={images[0]} alt="Royal mandap" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── WEDDING STORIES ─── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-gold justify-center">Real Weddings</p>
            <h2 className="text-display text-4xl lg:text-6xl">Wedding Stories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <motion.div
                key={s.couple}
                className="glass-card overflow-hidden group relative aspect-[4/5]"
                whileHover={{ y: -4, boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" }}
                data-testid={`card-story-${i}`}
              >
                <img src={images[i % images.length]} alt={s.couple} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <p className="section-label mb-2 text-gold/80">{s.date} — {s.location}</p>
                  <h3 className="font-serif text-3xl mb-1 text-white">{s.couple}</h3>
                  <p className="text-body text-sm text-white/70">{s.theme}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/wedding-stories">
              <motion.button
                className="px-10 py-4 border border-gold text-gold section-label hover:bg-gold hover:text-background transition-all"
                whileHover={{ scale: 1.02 }}
                data-testid="btn-all-stories"
              >
                View All Stories
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VIDEO REELS ─── */}
      <section className="py-24 lg:py-32 bg-muted/20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-gold justify-center">Cinematic Stories</p>
            <h2 className="text-display text-4xl lg:text-5xl mb-4">Captured Moments, Eternal Stories</h2>
            <p className="text-body text-sm max-w-xl mx-auto">
              From intimate ceremonies to grand royal celebrations — every frame tells a story.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "/images/cinematic_floral_wedding.webp",
              "/images/coastal_sunset_wedding.webp",
              "/images/royal_palace_reception.webp",
            ].map((src, i) => (
              <motion.div
                key={i}
                className="relative aspect-[4/5] overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                data-testid={`card-reel-${i}`}
              >
                <img
                  src={src}
                  alt={`Cinematic wedding moment ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)" }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="font-sans text-xs uppercase tracking-widest text-white/90">
                    Discover More
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLANNING JOURNEY ─── */}
      <section className="py-24 lg:py-32 relative border-y border-gold/10 bg-black/40">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <p className="section-label mb-4 text-gold justify-center">The Experience</p>
            <h2 className="text-display text-4xl lg:text-5xl">Your Planning Journey</h2>
          </div>
          <div className="relative">
            {/* Horizontal Line (Desktop) */}
            <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent -translate-y-1/2" />
            {/* Vertical Line (Mobile) */}
            <div className="md:hidden absolute left-8 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {[
                { step: "01", title: "Discovery", desc: "Understanding your vision, style, and essential requirements." },
                { step: "02", title: "Vision", desc: "Conceptualizing the design theme and creative direction." },
                { step: "03", title: "Design", desc: "Detailed 3D renders, material selection, and floral planning." },
                { step: "04", title: "Execution", desc: "Flawless production and on-site orchestration." },
                { step: "05", title: "Celebration", desc: "You enjoy every moment while we handle the details." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-4 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="w-16 h-16 shrink-0 md:w-20 md:h-20 rounded-full bg-background border border-gold/40 flex items-center justify-center font-serif text-xl text-gold group-hover:bg-gold group-hover:text-background group-hover:gold-glow transition-all">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl mb-2 text-white group-hover:text-gold transition-colors">{item.title}</h3>
                    <p className="text-body text-xs px-2">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-gold justify-center">Words of Love</p>
            <h2 className="text-display text-4xl lg:text-5xl">What Our Couples Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="glass-card p-8 relative hover:border-gold/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                data-testid={`card-testimonial-${i}`}
              >
                <div className="font-serif text-6xl leading-none mb-4 text-gold/40">&ldquo;</div>
                <div className="flex gap-1 mb-4 text-gold">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-quote text-base lg:text-lg text-foreground mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="h-px mb-4 bg-gold/20" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold font-serif">
                    {t.client.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif text-base">{t.client}</p>
                    <p className="section-label mt-1 text-gold/70">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/testimonials">
              <motion.button
                className="px-10 py-4 border border-gold text-gold section-label hover:bg-gold hover:text-background transition-all"
                whileHover={{ scale: 1.02 }}
                data-testid="btn-all-testimonials"
              >
                Read All Testimonials
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="py-32 lg:py-48 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-luxury-gradient opacity-60 z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <motion.p
            className="section-label mb-6 text-gold justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            className="text-display text-4xl lg:text-7xl mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            Begin Your Story<br />With Us
          </motion.h2>
          <motion.p
            className="text-body mb-10 text-lg max-w-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Every celebration is composed like a work of art.
          </motion.p>
          <Link href="/contact">
            <motion.button
              className="px-10 py-5 section-label bg-gold text-background hover:bg-gold/90 hover:gold-glow transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-testid="btn-cta-book"
            >
              Book Your Consultation
            </motion.button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
