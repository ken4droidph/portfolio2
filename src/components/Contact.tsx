import { motion } from "framer-motion";
import {
  YoutubeLogo,
  TiktokLogo,
  FacebookLogo,
} from "@phosphor-icons/react";

const socialLinks = [
  { icon: YoutubeLogo, href: "https://www.youtube.com/@MegoWorldPH", label: "YouTube" },
  { icon: TiktokLogo, href: "https://www.tiktok.com/@megoken", label: "TikTok" },
  { icon: FacebookLogo, href: "https://web.facebook.com/keneth.gepanaga", label: "Facebook" },
];

const Contact = () => {
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
              <h3 className="text-2xl font-bold text-foreground">My Social Media</h3>
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
                  target="_blank"
                  rel="noreferrer"
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
                <span className="text-muted-foreground text-sm">Email:</span>
                <p className="text-foreground font-medium">ken4droidph@gmail.com</p>
              </div>
              <div className="glass rounded-xl p-6 space-y-2">
                <span className="text-muted-foreground text-sm">Location:</span>
                <p className="text-foreground font-medium">Alijis, Bacolod City, Negros Occidental, Philippines</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
