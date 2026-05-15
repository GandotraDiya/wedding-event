import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Luxury Services", href: "/services" },
  { label: "Wedding Stories", href: "/wedding-stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(8, 8, 8, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(46 65% 52% / 0.3)" : "1px solid transparent",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex flex-col items-center lg:items-start cursor-pointer group"
              whileHover={{ opacity: 0.8 }}
              data-testid="logo"
            >
              <span className="font-serif text-2xl tracking-[0.25em] text-white leading-none">ALANKARAN</span>
              <span className="font-sans text-[7px] tracking-[0.4em] text-gold/90 mt-1.5 uppercase font-medium">Weddings & Events</span>
            </motion.div>
          </Link>

          {/* Desktop Nav - Responsive Flex */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-4 xl:gap-8 mx-4 whitespace-nowrap overflow-hidden">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`group relative cursor-pointer transition-colors duration-300 pb-1 text-[11px] xl:text-[13px] tracking-[0.15em] xl:tracking-[0.2em] uppercase font-medium ${
                    location === link.href
                      ? "text-gold"
                      : "text-white/70 hover:text-white"
                  }`}
                  whileHover={{ y: -1 }}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                  {/* Hover underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-left transition-transform duration-300 ${location === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link href="/contact">
              <motion.button
                className="hidden lg:block px-6 py-2 border border-gold/40 text-gold section-label hover:bg-gold/10 transition-all text-[10px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="btn-book-consultation"
              >
                CONSULTATION
              </motion.button>
            </Link>

            <motion.button
              className="lg:hidden p-2 text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.92 }}
              data-testid="btn-hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "rgba(5, 5, 5, 0.98)" }}
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href}>
                    <span
                      className="font-serif text-3xl text-white/90 hover:text-gold transition-colors cursor-pointer"
                      data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
              >
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/contact">
                    <button
                      className="w-full px-8 py-3 border border-gold text-gold section-label hover:bg-gold hover:text-foreground transition-all"
                      data-testid="mobile-btn-consultation"
                    >
                      Book Consultation
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Thin gold divider */}
            <div className="absolute bottom-10 w-16 h-px bg-gold opacity-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
