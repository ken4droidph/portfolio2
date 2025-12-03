import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-intense py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="text-2xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            K.
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm glow-primary hover:glow-primary-intense transition-all duration-300"
          >
            Let's Talk
          </motion.a>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-foreground p-2 relative z-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-card/90 backdrop-blur-xl border-l border-border/20 flex flex-col justify-center items-center gap-8 p-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="text-2xl font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.a
                href="#contact"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="mt-4 px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium glow-primary"
              >
                Let's Talk
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
