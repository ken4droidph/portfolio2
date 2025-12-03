import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FrameworksComparison = () => {
  // Use the built static copy in public/frameworks-comparison/index.html
  const src = `${import.meta.env.BASE_URL}frameworks-comparison/index.html`;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentWindow?.document;
      if (!doc) return;
      const updateHeight = () => {
        const height = doc.documentElement.scrollHeight || doc.body.scrollHeight;
        iframe.style.height = `${height}px`;
      };

      updateHeight();

      if ("ResizeObserver" in window) {
        const observer = new ResizeObserver(() => {
          updateHeight();
        });
        observer.observe(doc.body);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-0 overflow-hidden">
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={src}
            onLoad={handleLoad}
            title="Frameworks & Libraries Comparison"
            className="w-full h-full bg-white"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FrameworksComparison;
