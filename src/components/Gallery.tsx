import { motion } from "framer-motion";
import { useState } from "react";
import { X, ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";
import img8 from "./images/8.jpg";

const galleryItems = [
  {
    id: 1,
    title: "JS NAME ANIMATION",
    image: img1,
    category: "",
  },
  {
    id: 2,
    title: "Frameworks & Libraries Function Comparison",
    image: img2,
    category: "",
  },
  {
    id: 3,
    title: "Snake Game With AI Wall",
    image: img3,
    category: "",
  },
  {
    id: 4,
    title: "Free Funtion",
    image: img4,
    category: "",
  },
  {
    id: 5,
    title: "Multimedia",
    image: img5,
    category: "",
  },
  {
    id: 6,
    title: "Responsive Minimal Store",
    image: img6,
    category: "",
  },
  {
    id: 7,
    title: "Portfolio Project",
    image: img7,
    category: "",
  },
  {
    id: 8,
    title: "Advanced Portfolio",
    image: img8,
    category: "",
  },
];

type GalleryProps = {
  showViewAllButton?: boolean;
};

const Gallery = ({ showViewAllButton = true }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const navigate = useNavigate();

  const handleItemClick = (item: typeof galleryItems[0]) => {
    if (item.id === 1) {
      navigate("/js-name-animation");
    } else if (item.id === 2) {
      navigate("/frameworks-comparison#section1");
    } else if (item.id === 3) {
      navigate("/snake-game");
    } else if (item.id === 4) {
      navigate("/frameworks-comparison#section2");
    } else if (item.id === 5) {
      navigate("/frameworks-comparison#section3");
    } else if (item.id === 6) {
      window.open("https://ken4droidph.github.io/store/", "_blank");
    } else if (item.id === 7) {
      window.open("https://ken4droidph.github.io/kenportfolio/file/1/index.html", "_blank");
    } else if (item.id === 8) {
      window.open("https://ken4droidph.github.io/kenportfolio/file/3/index.html", "_blank");
    } else {
      setSelectedImage(item);
    }
  };

  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      {/* Light Orbs */}
      <div className="light-orb w-80 h-80 top-20 right-0" />
      <div className="accent-orb w-96 h-96 bottom-0 left-1/4" />

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
            Web Design &<span className="gradient-text"> Function</span>
          </h2>
        </motion.div>

        {/* 4-Image Grid (2x2) */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/50 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 md:p-6 pointer-events-none">
                    <div className="space-y-1 md:space-y-2">
                      <span className="text-primary text-xs md:text-sm font-medium">{item.category}</span>
                      <h3 className="text-foreground text-sm md:text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {showViewAllButton && (
          <div className="mt-10 flex justify-center">
            <motion.button
              type="button"
              onClick={() => navigate("/projects/allproject")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold glow-primary hover:glow-primary-intense transition-all duration-300"
            >
              View All Function & Web Design
              <ArrowRight weight="bold" size={20} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
          >
            <X weight="bold" size={24} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="mt-6 text-center">
              <span className="text-primary font-medium">{selectedImage.category}</span>
              <h3 className="text-2xl font-bold text-foreground mt-2">{selectedImage.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
