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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
      
      const newIndex = Math.round(newScrollLeft / scrollAmount);
      setActiveIndex(Math.max(0, Math.min(newIndex, testimonials.length - 1)));
    }
  };

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
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
          <span className="text-primary font-medium uppercase tracking-widest text-sm">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What <span className="gradient-text">Clients</span> Say
          </h2>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors -translate-x-6 hidden md:flex"
          >
            <CaretLeft weight="bold" size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 glass rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors translate-x-6 hidden md:flex"
          >
            <CaretRight weight="bold" size={24} />
          </motion.button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className={`flex-shrink-0 w-[350px] snap-center glass rounded-2xl p-8 space-y-6 transition-all duration-500 ${
                  activeIndex === index ? "glow-primary" : ""
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="text-primary" size={20} />
                  ))}
                </div>

                {/* Review */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: index * 400,
                    behavior: "smooth",
                  });
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
