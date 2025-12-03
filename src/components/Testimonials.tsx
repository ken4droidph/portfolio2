import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO, TechVentures",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    review: "Keneth transformed our vision into a stunning reality. His attention to detail and creative approach exceeded all expectations.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Founder, Nexus Labs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    review: "Working with Keneth was a game-changer. The 3D elements he created brought our platform to life in ways we never imagined.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Creative Director, Studio X",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    review: "Exceptional talent and professionalism. Keneth delivers pixel-perfect work with incredible animations every time.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    title: "Product Lead, Innovate Co",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    review: "The best developer I've worked with. His unique blend of technical skills and design sensibility is rare to find.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      {/* Light Orbs */}
      <div className="accent-orb w-[500px] h-[500px] top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" />
      <div className="light-orb w-72 h-72 bottom-0 right-20" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            View and download my resume to explore my experience, skills, and projects in detail.
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Navigation Buttons */}
          {/* Cards Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8 md:p-10 space-y-6 md:space-y-0 md:flex md:items-center md:justify-between gap-8"
          >
            <div className="space-y-4 md:max-w-md text-left md:text-left">
              <h3 className="text-2xl font-bold text-foreground">Download My Resume</h3>
              <p className="text-muted-foreground">
                I've put together my background, skills, and professional experience into a concise
                resume. Feel free to view it online or download a copy.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:w-[360px] lg:w-[420px]">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href={new URL("./file/resume.pdf", import.meta.url).href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold glow-primary hover:glow-primary-intense transition-all duration-300"
                >
                  Open Resume
                </a>
                <a
                  href={new URL("./file/resume.pdf", import.meta.url).href}
                  download
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary/60 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
                >
                  Download PDF
                </a>
              </div>

              <div className="rounded-xl overflow-hidden border border-border/60 bg-background/80 h-64 md:h-80 lg:h-96">
                <iframe
                  src={new URL("./file/resume.pdf", import.meta.url).href}
                  title="Keneth Resume Preview"
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
