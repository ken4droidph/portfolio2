import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FrameworksComparison = () => {
  // Use the built static copy in public/frameworks-comparison/index.html
  const src = `${import.meta.env.BASE_URL}frameworks-comparison/index.html`;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl overflow-hidden border border-border/40 bg-card">
            <iframe
              src={src}
              title="Frameworks & Libraries Comparison"
              className="w-full min-h-[80vh] bg-white"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FrameworksComparison;
