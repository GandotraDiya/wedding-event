import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import Consultation from "@/components/Consultation";
import SEO from "@/components/SEO";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  weddingDate: z.string().min(1, "Please select a date"),
  eventType: z.string().min(1, "Please select an event type"),
  guestCount: z.string().min(1, "Please select guest count"),
  location: z.string().min(2, "Please enter a location"),
  budget: z.string().min(1, "Please select a budget range"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const inputStyle = {
  borderRadius: "0",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  background: "rgba(255, 255, 255, 0.03)",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 300,
  fontSize: "0.875rem",
  color: "white",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", phone: "", email: "", weddingDate: "",
      eventType: "", guestCount: "", location: "", budget: "", message: "",
    },
  });

  const onSubmit = (_data: FormValues) => {
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground">
      <SEO 
        title="Contact Us & Inquiries" 
        description="Begin your luxury wedding journey with Alankaran. Contact our Mumbai, Delhi, or Jaipur studios to start planning your celebration."
      />
      {/* Hero */}
      <section className="relative h-[55vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(/images/floral_stage.webp)`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 z-10" style={{ background: "radial-gradient(circle at 50% 100%, rgba(212, 175, 55, 0.3) 0%, transparent 60%), linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.2) 50%, rgba(5,5,5,0.6) 100%)" }} />
        <div className="relative max-w-screen-xl mx-auto px-6 lg:px-12 z-20">
          <motion.p className="section-label mb-4 text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Get in Touch</motion.p>
          <motion.h1 className="text-display text-5xl lg:text-8xl text-white" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1 }}>
            Begin Your <em className="not-italic text-gold-gradient">Story</em>
          </motion.h1>
          <motion.p className="text-body mt-4 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Every great celebration begins with a single conversation.
          </motion.p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="p-12 glass-card text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  data-testid="success-message"
                >
                  <div className="font-serif text-5xl mb-4 text-gold">✦</div>
                  <h3 className="text-display text-3xl mb-4 text-white">Thank You</h3>
                  <p className="text-body text-sm max-w-md mx-auto">
                    Your inquiry has been received. Our team will be in touch within 24 hours to begin crafting your celebration.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="section-label mb-8 text-gold">Inquiry Form</p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Full Name *</FormLabel>
                            <FormControl>
                              <Input {...field} style={inputStyle} className="focus-visible:ring-primary" placeholder="Your full name" data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Phone Number *</FormLabel>
                            <FormControl>
                              <Input {...field} style={inputStyle} className="focus-visible:ring-primary" placeholder="+91 98765 43210" data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="section-label">Email Address *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" style={inputStyle} className="focus-visible:ring-primary" placeholder="your@email.com" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="weddingDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Wedding Date *</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" style={inputStyle} className="focus-visible:ring-primary" data-testid="input-wedding-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="eventType" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Event Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger style={inputStyle} className="focus:ring-primary" data-testid="select-event-type">
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Wedding Ceremony", "Reception", "Engagement", "Mehendi", "Sangeet", "Full Wedding Package"].map((v) => (
                                  <SelectItem key={v} value={v}>{v}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="guestCount" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Guest Count *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger style={inputStyle} className="focus:ring-primary" data-testid="select-guest-count">
                                  <SelectValue placeholder="Number of guests" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Under 100", "100–300", "300–500", "500–1000", "1000+"].map((v) => (
                                  <SelectItem key={v} value={v}>{v}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="location" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="section-label">Preferred Location *</FormLabel>
                            <FormControl>
                              <Input {...field} style={inputStyle} className="focus-visible:ring-primary" placeholder="City or venue" data-testid="input-location" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="section-label">Budget Range *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger style={inputStyle} className="focus:ring-primary" data-testid="select-budget">
                                <SelectValue placeholder="Select your budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {["Under ₹5L", "₹5–10L", "₹10–25L", "₹25–50L", "₹50L–1Cr", "Above ₹1Cr"].map((v) => (
                                <SelectItem key={v} value={v}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="section-label text-gold">Special Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              style={inputStyle}
                              className="focus-visible:ring-primary resize-none"
                              placeholder="Tell us about your dream celebration..."
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <motion.button
                        type="submit"
                        className="w-full py-4 bg-gold text-background section-label hover:bg-gold/90 hover:gold-glow transition-all"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        data-testid="btn-submit-inquiry"
                      >
                        Submit Inquiry
                      </motion.button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div>
            <p className="section-label mb-8 text-gold">Contact Information</p>
            <div className="space-y-6">
              <div>
                <p className="section-label mb-1 text-gold/80">Email</p>
                <p className="text-body text-sm text-foreground">chaitanya@alankaran.com</p>
                <p className="text-body text-sm text-foreground">chandrika@alankaran.com</p>
                <div className="h-px mt-4 bg-gold/20" />
              </div>
              <div>
                <p className="section-label mb-1 text-gold/80">Phone</p>
                <p className="text-body text-sm text-foreground">+91 89776 11886</p>
                <p className="text-body text-sm text-foreground">+91 91772 10150</p>
                <p className="text-body text-sm text-foreground">+91 88854 41188</p>
                <div className="h-px mt-4 bg-gold/20" />
              </div>
              <div>
                <p className="section-label mb-1 text-gold/80">Address</p>
                <p className="text-body text-sm text-foreground">Plot no: 78, TNGO's Colony Phase 2, Financial District, Gachibowli, Hyderabad, Telangana 500046</p>
                <div className="h-px mt-4 bg-gold/20" />
              </div>
              <div>
                <p className="section-label mb-1 text-gold/80">Working Hours</p>
                <p className="text-body text-sm text-foreground">Monday–Saturday, 10:00 AM – 7:00 PM IST</p>
                <div className="h-px mt-4 bg-gold/20" />
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://api.whatsapp.com/send/?phone=918977611886&text=Hi%21+Can+you+provide+me+with+more+information+on+your+event+planning+services%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full font-sans text-xs section-label px-4 py-3 bg-green-900/40 text-green-100 hover:bg-green-800/60 transition-colors"
                data-testid="link-whatsapp-contact"
              >
                💬 Chat on WhatsApp
              </a>

              {/* Social links */}
              <div className="flex gap-4 pt-2">
                <a href="https://www.instagram.com/alankaranevents" target="_blank" rel="noopener noreferrer" className="section-label text-xs hover:text-gold transition-colors text-muted-foreground">Instagram</a>
                <a href="https://www.facebook.com/alankaranevents" target="_blank" rel="noopener noreferrer" className="section-label text-xs hover:text-gold transition-colors text-muted-foreground">Facebook</a>
              </div>

              <div className="pt-2">
                <p className="section-label mb-4">Our Studios</p>
                <p className="text-body text-sm">Hyderabad — Headquarters</p>
                <p className="text-body text-sm">Delhi — Design Studio</p>
                <p className="text-body text-sm">Jaipur — Creative Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pb-20">
        <div className="h-px mb-12 bg-gold/20" />
        <p className="section-label mb-4 text-gold">Find Us</p>
        <h3 className="text-display text-2xl lg:text-3xl mb-6 text-white">Our Hyderabad Headquarters</h3>
        <div
          className="w-full overflow-hidden border border-gold/30"
          style={{ height: "440px" }}
          data-testid="map-embed"
        >
          <iframe
            title="Alankaran Hyderabad Headquarters"
            src="https://maps.google.com/maps?q=Alankaran+Events-+Best+Event+Management+%26+Wedding+Management+Company+in+Hyderabad&output=embed&z=14"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="font-sans text-xs font-light text-muted-foreground mt-3">
          Plot no: 78, TNGO's Colony Phase 2, Financial District, Gachibowli, Hyderabad, Telangana 500046
        </p>
      </div>

      {/* Consultation Section */}
      <Consultation />

      <Footer />
    </div>
  );
}
