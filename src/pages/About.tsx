import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Intentional Beauty", body: "Every element — from the weight of a fabric to the exact bloom of a peony — is chosen as a deliberate act of curation." },
  { title: "Heritage as Canvas", body: "Centuries of Indian wedding tradition serve as our creative foundation. We reimagine ritual as art." },
  { title: "Emotional Precision", body: "We design not just spaces, but feelings. The warmth of amber candlelight, the weight of a silence before vows." },
  { title: "Singular Vision", body: "No two Alankaran weddings are alike. Each celebration begins with listening, then becomes something entirely its own." },
];

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

export default function About() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealRef.current) return;
    const elements = revealRef.current.querySelectorAll(".gsap-reveal");
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", once: true }
        }
      );
    });
  }, []);

  return (
    <div className="bg-background text-foreground">
      <SEO 
        title="Our Story & Philosophy" 
        description="Discover the philosophy behind Alankaran. We don't just decorate spaces—we compose immersive luxury wedding experiences rooted in Indian heritage."
      />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${images[0]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.3) 0%, transparent 60%), linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.6) 100%)" }} />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-12 z-20">
          <motion.p
            className="section-label mb-4 text-gold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Alankaran
          </motion.p>
          <motion.h1
            className="text-display text-5xl lg:text-8xl text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      <div ref={revealRef} className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Brand Story */}
        <section className="py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="section-label mb-6 gsap-reveal text-gold">Origin</p>
            <h2 className="text-display text-4xl lg:text-5xl mb-8 gsap-reveal text-white">
              Born from the grandeur of<br />
              <em className="not-italic text-gold-gradient">royal Indian celebrations</em>
            </h2>
            <p className="text-body leading-relaxed gsap-reveal text-sm mb-6">
              Founded at the intersection of Indian heritage and contemporary editorial beauty, Alankaran has redefined luxury wedding celebrations across India and beyond. What began as a singular vision — to restore the grandeur of royal Indian weddings for the modern age — has grown into one of the country's most coveted wedding design studios.
            </p>
            <p className="text-body leading-relaxed gsap-reveal text-sm">
              We work with couples who understand that a wedding is not merely a ceremony. It is a composed experience — layers of light, fragrance, texture, and ceremony woven into a singular, unrepeatable moment in time.
            </p>
          </div>
          <div className="space-y-4">
            <div className="aspect-[4/3] gsap-reveal" style={{ backgroundImage: `url(${images[1]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="grid grid-cols-2 gap-4 gsap-reveal">
              <div className="aspect-square" style={{ backgroundImage: `url(${images[2]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div className="aspect-square" style={{ backgroundImage: `url(${images[0]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gold/10" />

        {/* Philosophy */}
        <section className="py-24 lg:py-32 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
          <p className="section-label mb-6 gsap-reveal text-gold relative z-10 justify-center">Our Philosophy</p>
          <blockquote className="text-display text-3xl lg:text-5xl max-w-4xl mx-auto gsap-reveal text-white relative z-10">
            &ldquo;We don&rsquo;t decorate spaces &mdash; we compose experiences.&rdquo;
          </blockquote>
          <p className="text-body mt-8 max-w-2xl mx-auto text-sm gsap-reveal relative z-10">
            Every floral arrangement, every drape of silk, every placement of candlelight is an intentional creative act. We believe that great wedding design should be felt as much as it is seen — in the warmth of a room, in the scent of jasmine, in the hush before a ceremony begins.
          </p>
        </section>

        {/* Values */}
        <section className="py-16 grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="glass-card p-8 gsap-reveal group"
              whileHover={{ y: -4 }}
              data-testid={`card-value-${i}`}
            >
              <div className="h-px mb-6 bg-gold/20 group-hover:bg-gold/40 transition-colors" />
              <h3 className="font-serif text-xl mb-3 text-white">{v.title}</h3>
              <p className="text-body text-sm">{v.body}</p>
            </motion.div>
          ))}
        </section>

        {/* Heritage */}
        <section className="py-16 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[3/4] overflow-hidden glass-card p-2">
            <div className="w-full h-full" style={{ backgroundImage: `url(${images[3]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
          <div>
            <p className="section-label mb-6 gsap-reveal text-gold">Heritage</p>
            <h2 className="text-display text-4xl lg:text-5xl mb-6 gsap-reveal text-white">
              Rooted in centuries<br />of Indian craft tradition
            </h2>
            <p className="text-body text-sm mb-6 gsap-reveal">
              Indian weddings are among the world's most elaborate and emotionally rich ceremonies. Our work draws from this extraordinary heritage — the geometry of Mughal gardens, the chromatic opulence of Rajputana courts, the fragrant devotion of temple floristry.
            </p>
            <p className="text-body text-sm gsap-reveal">
              We carry these traditions forward not as reproductions, but as living interpretations — reimagined for couples who honor the past while standing firmly in the present.
            </p>
          </div>
        </section>

        {/* Founder */}
        <section className="py-16 mb-24 border-t border-gold/10 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="aspect-[3/4] glass-card p-2">
              <div className="w-full h-full" style={{ backgroundImage: `url(${images[4]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
            <div className="lg:col-span-2 flex flex-col justify-center">
              <p className="section-label mb-4 gsap-reveal text-gold">Creative Director</p>
              <h2 className="text-display text-4xl lg:text-5xl mb-6 gsap-reveal text-white">Priya Sharma</h2>
              <p className="text-body text-sm mb-6 gsap-reveal">
                With over fifteen years devoted to the art of celebration, Priya Sharma founded Alankaran with a singular conviction: that a wedding should be indistinguishable from great art. Trained in art direction and with roots in classical Indian design, she brings an editorial precision and emotional depth to every project.
              </p>
              <p className="text-body text-sm mb-8 gsap-reveal">
                Her work has been featured in Vogue India, Harper's Bazaar Bride, and Architectural Digest. She has designed weddings across Udaipur, Jaipur, Mumbai, Goa, and destinations including London, Dubai, and the Maldives.
              </p>
              <div className="h-px mb-6 bg-gold/20" />
              <p className="text-quote text-lg text-gold/80 gsap-reveal">
                &ldquo;Every couple deserves a wedding that feels like the most beautiful version of themselves.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="py-24 text-center border-t border-gold/10 bg-black">
        <p className="section-label mb-4 text-gold justify-center">Ready to Begin?</p>
        <h3 className="text-display text-4xl mb-8 text-white">Let&rsquo;s craft your story together.</h3>
        <Link href="/contact">
          <motion.button
            className="px-10 py-4 bg-gold text-background section-label hover:bg-gold/90 hover:gold-glow transition-all"
            whileHover={{ scale: 1.03 }}
            data-testid="btn-about-contact"
          >
            Start the Conversation
          </motion.button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
