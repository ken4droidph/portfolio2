import { motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/30">
      {/* Subtle Glow */}
      <div className="accent-orb w-96 h-32 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-bold gradient-text"
          >
            K.
          </motion.a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-8">
            {footerLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <Heart weight="fill" className="text-primary" size={16} /> by Keneth
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-muted-foreground/60 text-xs">
            © {new Date().getFullYear()} Keneth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
