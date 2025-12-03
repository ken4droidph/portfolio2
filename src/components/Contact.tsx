import { motion } from "framer-motion";
import { useState } from "react";
import { 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo, 
  DribbbleLogo,
  PaperPlaneTilt 
} from "@phosphor-icons/react";

const socialLinks = [
  { icon: GithubLogo, href: "#", label: "GitHub" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
  { icon: TwitterLogo, href: "#", label: "Twitter" },
  { icon: DribbbleLogo, href: "#", label: "Dribbble" },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Light Orbs */}
      <div className="light-orb w-96 h-96 top-0 left-0 -translate-x-1/2" />
      <div className="accent-orb w-[500px] h-[500px] bottom-0 right-0 translate-x-1/4" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's bring your vision to life with stunning 
            design and cutting-edge technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these platforms. 
                I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 glass rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon weight="fill" size={28} />
                </motion.a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="glass rounded-xl p-6 space-y-2">
                <span className="text-muted-foreground text-sm">Email</span>
                <p className="text-foreground font-medium">hello@keneth.dev</p>
              </div>
              <div className="glass rounded-xl p-6 space-y-2">
                <span className="text-muted-foreground text-sm">Location</span>
                <p className="text-foreground font-medium">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-intense rounded-2xl p-8 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-3 transition-all duration-300 ${
                isSubmitting ? "animate-glow-pulse" : "glow-primary hover:glow-primary-intense"
              }`}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <PaperPlaneTilt weight="fill" size={20} />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
