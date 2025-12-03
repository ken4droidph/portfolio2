import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Light Orbs */}
      <div className="light-orb w-96 h-96 top-20 left-10" />
      <div className="accent-orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="light-orb w-64 h-64 bottom-20 right-20" />

      {/* Spline 3D Embed - Fullscreen */}
      <div className="absolute inset-0 z-10">
        <iframe
          src="https://my.spline.design/genkubgreetingrobot-Y67fyqSercUu5TxCt66UtKv4/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
          title="3D Robot"
        />
      </div>

      <div className="absolute inset-0 z-0">
        <div className="container mx-auto h-full px-6 flex items-center">
          <motion.div
            className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 w-full"
          >
            <motion.h1
              initial={{ opacity: 0, x: -200, y: -40 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [-40, 20, -15, 8, -4, 0],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-foreground max-w-xl text-right md:text-left"
            >
              Hi, I&apos;m <span className="gradient-text">Ken</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: 200, y: -40 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [-40, 20, -15, 8, -4, 0],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-foreground text-right whitespace-nowrap"
            >
              Hi, I&apos;m <span className="gradient-text">AI</span>
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
