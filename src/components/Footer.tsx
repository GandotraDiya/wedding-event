import { Link } from "wouter";
import { motion } from "framer-motion";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import { useState } from "react";
import { useBooking } from "@/context/BookingContext";

const services = [
  "Wedding Planning",
  "Luxury Wedding Decor",
  "Floral Styling",
  "Mandap Design",
  "Engagement Decor",
  "Reception Styling",
  "Royal Theme Weddings",
  "Bridal Entry Concepts",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Luxury Services", href: "/services" },

  { label: "Wedding Stories", href: "/wedding-stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { openBookingModal } = useBooking();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer className="bg-luxury-gradient text-foreground border-t border-gold/10">
      {/* Top section */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl tracking-[0.12em] mb-3 text-gold-gradient">
              ALANKARAN
            </p>
            <p className="section-label mb-4 text-gold">
              Luxury Wedding Experiences
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground font-light">
              Crafting royal Indian wedding experiences with timeless elegance, editorial precision, and heartfelt artistry. Every celebration is composed like a work of art.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: SiInstagram, label: "Instagram", href: "https://www.instagram.com/alankaranevents" },
                { Icon: SiFacebook, label: "Facebook", href: "https://www.facebook.com/alankaranevents" },
                { Icon: SiWhatsapp, label: "WhatsApp", href: "https://api.whatsapp.com/send/?phone=918977611886&text=Hi%21+Can+you+provide+me+with+more+information+on+your+event+planning+services%3F&type=phone_number&app_absent=0" },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gold/30 text-muted-foreground transition-colors cursor-pointer hover:border-gold hover:text-gold hover:gold-glow rounded-full"
                  aria-label={label}
                  data-testid={`social-${label.toLowerCase()}`}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="section-label mb-6 text-gold">Quick Links</p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      className="font-sans text-sm cursor-pointer transition-colors text-muted-foreground font-light hover:text-gold"
                      whileHover={{ x: 4 }}
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="section-label mb-6 text-gold">Our Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-sans text-sm text-muted-foreground font-light">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <p className="section-label mb-6 text-gold">Contact</p>
            <div className="space-y-3 mb-8">
              <a href="mailto:chaitanya@alankaran.com" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light">
                chaitanya@alankaran.com
              </a>
              <a href="mailto:chandrika@alankaran.com" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light">
                chandrika@alankaran.com
              </a>
              <a href="tel:+918977611886" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light">
                +91 89776 11886
              </a>
              <a href="tel:+919177210150" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light">
                +91 91772 10150
              </a>
              <a href="tel:+918885441188" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light">
                +91 88854 41188
              </a>
              <a href="https://maps.google.com/?q=Alankaran+Events,+Plot+no:+78,+TNGO's+Colony+Phase+2,+Financial+District,+Gachibowli,+Hyderabad,+Telangana+500046" target="_blank" rel="noopener noreferrer" className="block font-sans text-sm text-muted-foreground hover:text-gold transition-colors font-light leading-relaxed">
                Financial District, Gachibowli, Hyderabad 500046
              </a>
              <p className="block font-sans text-sm text-muted-foreground font-light">
                Mon–Sat, 10AM–7PM IST
              </p>
              <a
                href="https://api.whatsapp.com/send/?phone=918977611886&text=Hi%21+Can+you+provide+me+with+more+information+on+your+event+planning+services%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs section-label px-3 py-2 mt-1 bg-green-900/40 text-green-100 hover:bg-green-800/60 transition-colors rounded-sm w-full justify-center"
                data-testid="link-whatsapp"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            <p className="section-label mb-3 text-gold">Newsletter</p>
            {subscribed ? (
              <p className="font-sans text-sm text-gold">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex" data-testid="form-newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-xs font-sans bg-black/40 border border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/50 text-white transition-all placeholder:text-muted-foreground"
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="px-4 py-2 section-label transition-all bg-gold text-background hover:bg-gold/90 hover:gold-glow"
                  data-testid="btn-newsletter-subscribe"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-sans text-xs text-muted-foreground/70 font-light">
          &copy; {new Date().getFullYear()} Alankaran. All rights reserved.
        </p>
        <p className="font-sans text-xs italic text-gold/70 font-light">
          Where heritage meets modern romance.
        </p>
      </div>
    </footer>
  );
}
