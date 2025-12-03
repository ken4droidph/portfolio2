import { motion } from "framer-motion";
import { useState } from "react";
import { X, ArrowsOut } from "@phosphor-icons/react";

const galleryItems = [
  {
    id: 1,
    title: "3D Product Render",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
    category: "3D Design",
  },
  {
    id: 2,
    title: "Mobile App UI",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "UI Design",
  },
  {
    id: 3,
    title: "Brand Identity",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    category: "Branding",
  },
  {
    id: 4,
    title: "Dashboard Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Web Design",
  },
  {
    id: 5,
    title: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    category: "Animation",
  },
  {
    id: 6,
    title: "Icon System",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    category: "Icon Design",
  },
  {
    id: 7,
    title: "E-commerce Design",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "Web Design",
  },
  {
    id: 8,
    title: "Logo Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop",
    category: "Branding",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

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
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4 md:p-6">
                    <div className="space-y-1 md:space-y-2">
                      <span className="text-primary text-xs md:text-sm font-medium">{item.category}</span>
                      <h3 className="text-foreground text-sm md:text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>

                  {/* Fullscreen Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(item)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 glass rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ArrowsOut weight="bold" className="w-4 h-4 md:w-5 md:h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
