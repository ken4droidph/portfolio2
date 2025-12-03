import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import mainImage from "./images/main.png";
import readdyImage from "./images/readdy.png";
import capcutImage from "./images/capcut.png";

const skills = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Shopify Liquid", icon: "https://cdn.simpleicons.org/shopify/7AB55C" },
  { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
  { name: "Readdy Ai", icon: readdyImage },
  { name: "Lovable", icon: "https://lovable.dev/favicon.ico" },
  { name: "Windsurf", icon: "https://codeium.com/favicon.ico" },
  { name: "Cursor AI", icon: "https://www.cursor.so/favicon.ico" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "ChatGPT", icon: "https://openai.com/favicon.ico" },
  { name: "Gemini", icon: "https://cdn.simpleicons.org/googlegemini/8E24AA" },
  { name: "Veo 3", icon: "https://cdn.simpleicons.org/google/4285F4" },
  { name: "CapCut", icon: capcutImage },
  { name: "Filmora", icon: "https://cdn.simpleicons.org/wondersharefilmora/07273D" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "YouTube", icon: "https://cdn.simpleicons.org/youtube/FF0000" },
  { name: "Google Ads", icon: "https://cdn.simpleicons.org/googleads/4285F4" },
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

              <div className="absolute inset-0 pointer-events-none">
                {/* Upper / outside */}
                <div
                  className="orange-snow-dot"
                  style={{ top: "-6%", left: "22%", animationDelay: "0s", animationDuration: "5s" }}
                />
                <div
                  className="orange-snow-dot"
                  style={{ top: "-4%", left: "55%", animationDelay: "0.7s", animationDuration: "5.5s" }}
                />
                <div
                  className="orange-snow-dot"
                  style={{ top: "4%", right: "10%", animationDelay: "1.4s", animationDuration: "4.5s" }}
                />

                {/* Sides */}
                <div
                  className="orange-snow-dot"
                  style={{ top: "28%", left: "4%", animationDelay: "1.1s", animationDuration: "5.2s" }}
                />
                <div
                  className="orange-snow-dot"
                  style={{ top: "32%", right: "3%", animationDelay: "1.9s", animationDuration: "4.8s" }}
                />

                {/* Lower area */}
                <div
                  className="orange-snow-dot"
                  style={{ bottom: "24%", left: "20%", animationDelay: "2.3s", animationDuration: "5.3s" }}
                />
                <div
                  className="orange-snow-dot"
                  style={{ bottom: "16%", right: "18%", animationDelay: "2.9s", animationDuration: "4.7s" }}
                />
                <div
                  className="orange-snow-dot"
                  style={{ bottom: "-6%", left: "48%", animationDelay: "3.4s", animationDuration: "5.6s" }}
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
                a Creative AI-Assisted <p> Full-Stack Developer.</p>
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
             I combine strong programming skills with AI tools to build interactive and modern web applications. With the help of AI, I can quickly identify and fix problems and bugs, making development faster and more efficient. I also have experience in video and photo editing, as well as content creation, to enhance digital projects.
            </p>

            <p className="text-muted-foreground leading-relaxed">
            I specialize in full-stack development, responsive websites, UI/UX design, API integration, and performance optimization. From concept to deployment, I ensure every project is clean, efficient, and delivers a smooth user experience.
            </p>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold">SKill & Knowledge</h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
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
