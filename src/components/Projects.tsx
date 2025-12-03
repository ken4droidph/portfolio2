import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const projects = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "An immersive analytics platform with real-time 3D data visualization and interactive charts for enterprise clients.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Three.js", "D3.js", "Node.js"],
    link: "#",
  },
  {
    id: 2,
    title: "CryptoVerse",
    description: "A next-gen cryptocurrency trading platform featuring live market data, portfolio tracking, and AI-powered insights.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    tags: ["Next.js", "Web3", "Tailwind", "Framer"],
    link: "#",
  },
  {
    id: 3,
    title: "MetaSpace VR",
    description: "Virtual reality experience platform enabling users to create and explore immersive 3D environments together.",
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&h=600&fit=crop",
    tags: ["Spline", "React", "WebGL", "Socket.io"],
    link: "#",
  },
  {
    id: 4,
    title: "EcoTrack",
    description: "Sustainability monitoring app that gamifies carbon footprint reduction with beautiful visualizations and rewards.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Charts", "AI"],
    link: "#",
  },
];

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Light Orbs */}
      <div className="light-orb w-96 h-96 top-0 left-1/4" />
      <div className="accent-orb w-[600px] h-[600px] bottom-0 right-0 translate-x-1/2" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative group ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl border border-border/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>

              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-primary font-medium"
                >
                  0{index + 1}
                </motion.span>

                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className={`flex flex-wrap gap-3 ${index % 2 === 1 ? "lg:justify-end" : ""}`}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <motion.button
                  type="button"
                  onClick={() => navigate(`/projects/${project.id}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold glow-primary hover:glow-primary-intense transition-all duration-300 ${
                    index % 2 === 1 ? "lg:ml-auto" : ""
                  }`}
                >
                  View Project
                  <ArrowRight weight="bold" size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
