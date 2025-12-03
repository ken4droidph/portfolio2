import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";

const tagIcons: Record<string, string> = {
  Html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  Css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  AI: "https://openai.com/favicon.ico",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  AngularJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  jQuery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  AlpineJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/alpinejs/alpinejs-original.svg",
  D3js: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
};

export const projects = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description:
      "An immersive analytics platform with real-time 3D data visualization and interactive charts for enterprise clients.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "Three.js", "D3.js", "Node.js"],
    link: "#",
  },
  {
    id: 2,
    title: "JS NAME ANIMATION",
    description:
      "On this page, there is a name, and you can add additional names as well that gets struck by lightning and small electric sparks. It also absorbs tiny animated dust particles, causing it to grow significantly in size. After 30 seconds, it ‘explodes’ and resets, creating a continuous and visually striking animation effect.",
    image: img1,
    tags: ["Html", "Css", "Javascript", "AI"],
    link: "#",
  },
  {
    id: 3,
    title: "Frameworks & Libraries Function Comparison",
    description:
      "On this page, you can see various functions in JavaScript, including JavaScript, React, AngularJS, Vue, jQuery, AlpineJS, and D3.js.",
    image: img2,
    tags: ["Html", "Css", "Javascript", "React", "AngularJS", "Vue", "jQuery", "AlpineJS", "D3.js"],
    link: "#",
  },
  {
    id: 4,
    title: "EcoTrack",
    description:
      "Sustainability monitoring app that gamifies carbon footprint reduction with beautiful visualizations and rewards.",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
    tags: ["React Native", "Firebase", "Charts", "AI"],
    link: "#",
  },
];

const Projects = () => {
  const navigate = useNavigate();

  const featuredProjects = projects.filter((p) => p.id === 2 || p.id === 3);

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
          {featuredProjects.map((project) => {
            const originalIndex = projects.findIndex((p) => p.id === project.id);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: originalIndex % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  originalIndex % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group ${originalIndex % 2 === 1 ? "lg:order-2" : ""}`}
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
                <div className={`space-y-6 ${originalIndex % 2 === 1 ? "lg:order-1 lg:text-right" : ""}`}>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    {project.title === "JS NAME ANIMATION" ? (
                      <button
                        type="button"
                        onClick={() => navigate("/js-name-animation")}
                        className="hover:text-primary transition-colors duration-300 bg-transparent"
                      >
                        {project.title}
                      </button>
                    ) : project.title === "Frameworks & Libraries Function Comparison" ? (
                      <button
                        type="button"
                        onClick={() => navigate("/frameworks-comparison")}
                        className="hover:text-primary transition-colors duration-300 bg-transparent"
                      >
                        {project.title}
                      </button>
                    ) : (
                      project.title
                    )}
                  </h3>

                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-3 ${originalIndex % 2 === 1 ? "lg:justify-end" : ""}`}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="glass px-3 py-2 rounded-full text-sm font-medium text-foreground inline-flex items-center gap-2"
                      >
                        <img
                          src={tagIcons[tag] || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"}
                          alt={tag}
                          className="w-4 h-4"
                        />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  {project.id === 3 && (
                    <motion.button
                      type="button"
                      onClick={() => navigate("/projects/allproject")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold glow-primary hover:glow-primary-intense transition-all duration-300 ${
                        originalIndex % 2 === 1 ? "lg:ml-auto" : ""
                      }`}
                    >
                      View All Project
                      <ArrowRight weight="bold" size={20} />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
