import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { projects } from "@/components/Projects";
import chatbotIcon from "@/components/images/chatbot.png";
import chatbotBotIcon from "@/components/images/chatbot1.png";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "ken-portfolio-chat-history";

const ProjectGallery = () => {
  const { id } = useParams();
  const isAllProject = id === "allproject";
  const project = !isAllProject && id ? projects.find((p) => String(p.id) === id) ?? projects[0] : null;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timeoutId: number | null = null;

    const handleScroll = () => {
      setIsScrolling(true);

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(() => {
        setIsScrolling(false);
        setHasScrolled(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as {
        updatedAt: number;
        messages: ChatMessage[];
      };

      if (!parsed || typeof parsed.updatedAt !== "number" || !Array.isArray(parsed.messages)) {
        return;
      }

      const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.updatedAt > THREE_DAYS_MS) {
        window.localStorage.removeItem(STORAGE_KEY);
        return;
      }

      setMessages(parsed.messages);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  }, []);

  useEffect(() => {
    if (!isChatOpen) return;
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isChatOpen]);

  const persistMessages = (msgs: ChatMessage[]) => {
    try {
      const payload = {
        updatedAt: Date.now(),
        messages: msgs,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save chat history", err);
    }
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setError("Missing API key. Please set VITE_GROQ_API_KEY in .env.local.");
      return;
    }

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];

    setMessages(newMessages);
    persistMessages(newMessages);
    setInputValue("");
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant inside Ken's portfolio website.",
            },
            ...newMessages,
          ],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content?.trim();

      if (!reply) {
        throw new Error("Empty response from chat API");
      }

      setMessages((prev) => {
        const updated: ChatMessage[] = [...prev, { role: "assistant", content: reply }];
        persistMessages(updated);
        return updated;
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

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
        <Gallery showViewAllButton={false} titleUnderImage={isAllProject} />

        {isAllProject && (
          <>
            {isChatOpen && !isScrolling && (
              <div className="fixed bottom-24 right-6 z-50 w-64 rounded-2xl bg-background/95 text-foreground shadow-lg border border-orange-400 overflow-hidden flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-orange-500 text-white cursor-pointer"
                >
                  <img
                    src={chatbotBotIcon}
                    alt="KEN BOT"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-base font-bold tracking-wide">KEN BOT</span>
                </button>

                <div className="p-3 flex flex-col gap-2">
                  <div className="flex-1 min-h-[80px] max-h-48 overflow-y-auto no-scrollbar space-y-2 pr-1 text-[10px] sm:text-xs md:text-[11px]">
                    {messages.length === 0 ? (
                      <p className="text-muted-foreground">
                        Ask me anything about this portfolio or your ideas.
                      </p>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div className="flex items-start gap-1">
                            {message.role === "assistant" && (
                              <img
                                src={chatbotBotIcon}
                                alt="KEN BOT"
                                className="w-4 h-4 rounded-full mt-0.5"
                              />
                            )}
                            <div
                              className={`rounded-lg px-2 py-1 break-words break-all ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground max-w-full"
                                  : "bg-muted text-foreground max-w-[80%]"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {error && (
                    <div className="mt-1 text-[10px] text-red-500">
                      {error}
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void handleSend();
                    }}
                    className="mt-2 flex items-center gap-1"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-full border border-border/60 bg-background px-2 py-1 text-[10px] focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      disabled={isSending || !inputValue.trim()}
                      className="text-[10px] px-2 py-1 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                    >
                      {isSending ? "..." : "Send"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div
              className={`fixed ${
                hasScrolled ? "bottom-2 right-2" : "bottom-[calc(5rem-15px)] right-2"
              } z-50 flex flex-col items-center transition-all duration-300`}
            >
              {!isScrolling && !isChatOpen && (
                <motion.button
                  type="button"
                  onClick={() => setIsChatOpen((prev) => !prev)}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center w-32 h-32 cursor-pointer"
                >
                  <img
                    src={chatbotIcon}
                    alt="Chatbot"
                    className="w-28 h-28 object-contain"
                  />
                </motion.button>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectGallery;
