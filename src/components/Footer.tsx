import { motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";
import signatureImage from "./images/signature.png";

const base = import.meta.env.BASE_URL;

const footerLinks = [
  { label: "About", href: `${base}#about` },
  { label: "Projects", href: `${base}#projects` },
  { label: "My Resume", href: `${base}#resume` },
  { label: "Web Design & Function", href: `${base}#gallery` },
  { label: "Contact", href: `${base}#contact` },
  { label: "My AI VIDEOS", href: "https://drive.google.com/drive/u/0/folders/1YOniY9NNJ1yOVIHInuQ2iqtqXmGggQU3", external: true },
];

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border/30">
      {/* Subtle Glow */}
      <div className="accent-orb w-96 h-32 bottom-0 left-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Mobile: links row */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:hidden">
            <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={(link as any).external ? "_blank" : undefined}
                  rel={(link as any).external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -2 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium whitespace-nowrap"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Desktop logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="hidden md:inline-flex items-center"
          >
            <img
              src={signatureImage}
              alt="Keneth Gepanaga signature"
              className="h-16 w-auto"
            />
          </motion.a>

          {/* Desktop links */}
          <nav className="hidden md:flex flex-wrap items-center justify-center gap-8">
            {footerLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={(link as any).external ? "_blank" : undefined}
                rel={(link as any).external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm flex items-center gap-2 flex-wrap justify-center md:justify-end">
            <img
              src={signatureImage}
              alt="Keneth Gepanaga signature"
              className="h-8 w-auto md:hidden"
            />
            <span className="flex items-center gap-2">
              Made with <Heart weight="fill" className="text-primary" size={16} /> by: Ken & AI
            </span>
          </div>
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
