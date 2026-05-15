import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=918977611886&text=Hi%21+Can+you+provide+me+with+more+information+on+your+event+planning+services%3F&type=phone_number&app_absent=0";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { openBookingModal } = useBooking();

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[220px] p-4 glass-card"
            style={{
              background: "rgba(5,5,5,0.9)",
            }}
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gold/60 hover:text-gold transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
            <p
              className="font-sans text-xs leading-relaxed text-muted-foreground font-light"
            >
              Chat with us on WhatsApp — we're available Mon–Sat, 10AM–7PM IST.
            </p>
            <div
              className="absolute -bottom-[1px] right-8 w-3 h-3 rotate-45 bg-[#050505] border-r border-b border-gold/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp button */}
      <motion.button
        onClick={openWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center w-14 h-14 shadow-lg rounded-full"
        style={{ background: "#25D366" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: "spring" }}
        aria-label="Chat on WhatsApp"
        data-testid="btn-whatsapp"
      >
        {/* WhatsApp SVG icon */}
        <svg
          viewBox="0 0 24 24"
          fill="white"
          width="26"
          height="26"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>

        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(212, 175, 55, 0.4)", zIndex: -1 }}
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.8, 0, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        />
      </motion.button>

      {/* Book Now Button Below WhatsApp */}
      <motion.button
        onClick={openBookingModal}
        className="flex items-center gap-2 px-5 py-3 bg-gold text-black section-label font-bold shadow-2xl rounded-full gold-glow transition-all hover:scale-105 active:scale-95 text-[10px] tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Calendar size={14} />
        <span>BOOK NOW</span>
      </motion.button>
    </div>
  );
}
