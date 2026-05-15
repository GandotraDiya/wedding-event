import { Link } from "wouter";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const destinations = [
  { name: "Rajasthan", sub: "Desert palaces, golden forts, regal ceremonies under open skies.", detail: "Udaipur, Jaipur, Jodhpur, Jaisalmer" },
  { name: "Goa", sub: "Coastline ceremonies, colonial elegance, and the eternal rhythm of the sea.", detail: "North & South Goa" },
  { name: "Kerala Backwaters", sub: "Tropical lushness, houseboat rituals, and intimate waterside gatherings.", detail: "Alleppey, Kumarakom, Munnar" },
  { name: "Udaipur Lakes", sub: "The City of Lakes — ceremonies reflected in still water, dusk light on white marble.", detail: "Lake Pichola, Fateh Sagar" },
  { name: "International", sub: "From European châteaus to island escapes — we design weddings wherever love leads.", detail: "Maldives, Italy, France, Dubai, UK" },
];

const timeline = [
  { step: "01", title: "Vision", desc: "We meet, we listen, we understand. Your vision becomes our creative canvas." },
  { step: "02", title: "Design", desc: "Mood boards, material palettes, floral direction — the aesthetic language of your celebration." },
  { step: "03", title: "Venue", desc: "Location scouting, venue negotiations, site visits — the perfect setting is non-negotiable." },
  { step: "04", title: "Execution", desc: "Our team arrives days ahead. Every element is built, refined, and perfected." },
  { step: "05", title: "Celebration", desc: "You arrive. You breathe. You celebrate. Everything else is ours to manage." },
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

export default function DestinationWeddings() {
  return (
    <div className="bg-background text-foreground">
      <SEO 
        title="Destination Weddings" 
        description="Experience love beyond borders with our destination wedding planning services in Rajasthan, Goa, Kerala, and international locales."
      />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${images[1]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.3) 0%, transparent 60%), linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.6) 100%)" }} />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-12 z-20">
          <motion.p className="section-label mb-4 text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Destination Weddings</motion.p>
          <motion.h1 className="text-display text-5xl lg:text-8xl text-white" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            Love Beyond<br /><em className="not-italic text-gold-gradient">Borders</em>
          </motion.h1>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Intro */}
        <section className="py-24 border-b border-gold/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
          <p className="text-quote text-2xl lg:text-3xl text-gold/80 max-w-4xl mx-auto relative z-10">
            &ldquo;We craft unforgettable wedding experiences in India&rsquo;s most iconic destinations and beyond — wherever the world calls, we follow.&rdquo;
          </p>
        </section>

        {/* Destinations */}
        <section className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d, i) => (
              <motion.div
                key={d.name}
                className="glass-card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -6 }}
                data-testid={`card-destination-${i}`}
              >
                <div className="overflow-hidden aspect-[4/3]">
                  <div className="w-full h-full transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${images[i % images.length]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl mb-2 text-white">{d.name}</h3>
                  <p className="text-body text-xs mb-4">{d.sub}</p>
                  <p className="section-label text-gold tracking-widest">{d.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 border-t border-gold/10">
          <p className="section-label mb-4 text-center text-gold justify-center">Our Process</p>
          <h2 className="text-display text-4xl lg:text-5xl text-center mb-24 text-white">Planning Your Destination Wedding</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {timeline.map((t, i) => (
              <motion.div
                key={t.step}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-testid={`timeline-step-${i}`}
              >
                <div className="font-serif text-5xl mb-4 text-gold/40 group-hover:text-gold transition-colors">{t.step}</div>
                <div className="h-px mb-6 bg-gold/20" />
                <h3 className="font-serif text-xl mb-3 text-white">{t.title}</h3>
                <p className="text-body text-sm px-4 md:px-0">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Venue showcase */}
        <section className="py-24 border-t border-gold/10">
          <p className="section-label mb-4 text-gold">Venue Styling</p>
          <h2 className="text-display text-3xl lg:text-5xl mb-12 text-white">Every Venue Becomes a Canvas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`overflow-hidden glass-card p-1 ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"} group`}>
                <div className="w-full h-full transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${images[i % images.length]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center border-t border-gold/10 bg-black">
          <p className="section-label mb-4 text-gold justify-center">Start Planning</p>
          <h2 className="text-display text-4xl lg:text-5xl mb-6 text-white">Plan Your Destination Wedding</h2>
          <p className="text-body text-sm mb-10 max-w-md mx-auto">
            Tell us your dream destination and we&rsquo;ll take care of everything from concept to celebration.
          </p>
          <Link href="/contact">
            <motion.button
              className="px-10 py-4 bg-gold text-background section-label hover:bg-gold/90 hover:gold-glow transition-all"
              whileHover={{ scale: 1.03 }}
              data-testid="btn-destination-inquire"
            >
              Begin the Journey
            </motion.button>
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
