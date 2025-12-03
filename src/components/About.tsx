import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import mainImage from "./images/main.png";

const skills = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Shopify Liquid", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Lovable", icon: "https://lovable.dev/favicon.ico" },
  { name: "Windsurf", icon: "https://codeium.com/favicon.ico" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Light Orbs */}
      <div className="light-orb w-80 h-80 top-0 right-0" />
      <div className="accent-orb w-96 h-96 bottom-0 left-0" />

      <div ref={ref} className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 blur-2xl scale-110" />
              
              {/* Image Container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-primary/30 glow-primary">
                <img
                  src={mainImage}
                  alt="Keneth - Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-full"
              >
                <span className="text-primary font-semibold">1+ Years Exp</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="text-primary font-medium uppercase tracking-widest text-sm"
              >
                About Me
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                I'm <span className="gradient-text">Keneth</span>,<br />
                Creative Developer
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              A passionate developer crafting immersive digital experiences that blend 
              cutting-edge technology with stunning visual design. I specialize in building 
              interactive 3D web applications that push the boundaries of what's possible 
              on the web.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              From concept to deployment, I bring ideas to life with clean code, 
              smooth animations, and attention to every pixel. Let's create something 
              extraordinary together.
            </p>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold">SKill & Knowledge</h3>
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="glass px-4 py-3 rounded-xl flex items-center gap-3 cursor-default"
                  >
                    <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
