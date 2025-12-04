import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { projects } from "@/components/Projects";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const ProjectGallery = () => {
  const { id } = useParams();
  const isAllProject = id === "allproject";
  const project = !isAllProject && id ? projects.find((p) => String(p.id) === id) ?? projects[0] : null;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        {/* Project Hero (hidden for allproject) */}
        {!isAllProject && project && (
          <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="light-orb w-96 h-96 top-0 left-1/4" />
            <div className="accent-orb w-[600px] h-[600px] bottom-0 right-0 translate-x-1/2" />

            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl space-y-6"
              >
                <span className="text-primary font-medium uppercase tracking-widest text-sm">
                  Project Gallery
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  {project.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass px-4 py-2 rounded-full text-sm font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/90"
                >
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <Gallery showViewAllButton={false} />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectGallery;
