import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gallery, { galleryItems } from "@/components/Gallery";
import { projects } from "@/components/Projects";
import chatbotIcon from "@/components/images/chatbot.png";
import chatbotBotIcon from "@/components/images/chatbot1.png";
import { motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type GalleryItem = (typeof galleryItems)[0];

const STORAGE_KEY = "ken-portfolio-chat-history";

const ProjectGallery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [viewMode, setViewMode] = useState<"split" | "web" | "js">("split");

  const webDesignItems = galleryItems.filter((item) => item.category === "Web Design");
  const jsFunctionItems = galleryItems.filter((item) => item.category === "JS Function");

  const webViewItems = webDesignItems;
  const jsViewItems = jsFunctionItems;

  const handleGalleryItemClick = (item: GalleryItem) => {
    if (item.id === 1) {
      navigate("/js-name-animation");
    } else if (item.id === 2) {
      navigate("/frameworks-comparison#section1");
    } else if (item.id === 3) {
      navigate("/snake-game");
    } else if (item.id === 4) {
      navigate("/frameworks-comparison#section2");
    } else if (item.id === 5) {
      navigate("/frameworks-comparison#section3");
    } else if (item.id === 6) {
      window.open("https://ken4droidph.github.io/store/", "_blank");
    } else if (item.id === 7) {
      window.open("https://ken4droidph.github.io/kenportfolio/file/1/index.html", "_blank");
    } else if (item.id === 8) {
      window.open("https://ken4droidph.github.io/kenportfolio/file/3/index.html", "_blank");
    } else if (item.id === 9) {
      navigate("/frameworks-comparison#section4");
    } else if (item.id === 10) {
      navigate("/frameworks-comparison#section5");
    } else if (item.id === 11) {
      window.open("https://ken4droidph.github.io/nbastore/", "_blank");
    } else if (item.id === 12) {
      window.open("https://ken4droidph.github.io/nbay/", "_blank");
    } else if (item.id === 13) {
      window.open("https://ken4droidph.github.io/stalluxe2/", "_blank");
    }
  };

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

  const handleClearTopicAndHistory = () => {
    setMessages([]);
    persistMessages([]);
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

    // Michelle keyword handler
    const lower = trimmed.toLowerCase();

    if (lower === "ken" || lower === "keneth") {
      const suggestion =
        "Suggestion: You can ask about Keneth info, contact, work experience, skills, projects, education, availability, or AI/chatbot services.";
      setMessages((prev) => {
        const updated: ChatMessage[] = [
          ...prev,
          { role: "assistant", content: suggestion },
        ];
        persistMessages(updated);
        return updated;
      });
      setIsSending(false);
      return;
    }

    if (lower.includes("michelle")) {
      const replies = [
        "Si Michelle ay Patay na Patay kay Keneth.",
        "Si Michelle ay Di makakalimot kay Keneth kahit anong mangyari.",
        "Si Michelle ay Laging iniisip si Keneth.",
        "Si Michelle ay Totally in love kay Keneth.",
        "Si Michelle ay Nakangiti lang kapag kasama si Keneth.",
        "Si Michelle ay Handang gawin ang lahat para kay Keneth.",
        "Si Michelle ay Nahulog ang puso kay Keneth sa unang tingin.",
        "Si Michelle ay Crazy sa sweet gestures ni Keneth.",
        "Si Michelle ay Hindi mapakali kapag malayo kay Keneth.",
        "Si Michelle ay Forever fan ni Keneth."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => {
        const updated: ChatMessage[] = [...prev, { role: "assistant", content: randomReply }];
        persistMessages(updated);
        return updated;
      });
      setIsSending(false);
      return;
    }

    // Keneth keyword handler: read resume.txt and reply with a summary
    if (lower.includes("keneth")) {
      try {
        const resumeRes = await fetch(new URL("./components/file/resume.txt", import.meta.url).href);
        if (!resumeRes.ok) throw new Error("Failed to load resume file");
        const resumeText = await resumeRes.text();
        const lines = resumeText.split("\n").filter(Boolean);
        const name = lines.find(l => l.startsWith("KENETH")) || "Keneth S. Gepanaga";
        const contact = lines.find(l => l.includes("E-mail:")) || "";
        const objective = lines.find(l => l.startsWith("OBJECTIVE:")) || "";
        const education = lines.find(l => l.includes("College")) || "";
        const work = lines.find(l => l.includes("2023–2025")) || "";
        const skills = lines.slice(36, 42).join("; ");
        const summary = `About ${name}\n${contact}\n\n${objective}\n\nEducation:\n${education}\n\nRecent Work:\n${work}\n\nKey Skills:\n${skills}`;
        setMessages((prev) => {
          const updated: ChatMessage[] = [...prev, { role: "assistant", content: summary }];
          persistMessages(updated);
          return updated;
        });
      } catch (err) {
        setMessages((prev) => {
          const updated: ChatMessage[] = [...prev, { role: "assistant", content: "Sorry, I couldn’t load Keneth’s info right now." }];
          persistMessages(updated);
          return updated;
        });
      }
      setIsSending(false);
      return;
    }

    // Keyword-based topics for Keneth's info and services
    const keywordRules: { keywords: string[]; answer: string }[] = [
      {
        keywords: ["about", "who are you", "ken", "developer", "introduction"],
        answer:
          "I’m Keneth, an AI-assisted full-stack developer. I build modern and responsive websites, custom functions, and interactive designs using HTML, CSS, JavaScript, PHP, MySQL, Shopify Liquid, and multiple AI tools. I focus on clean, fast, and efficient development.",
      },
      {
        keywords: ["skills", "abilities", "tech stack", "knowledge", "what can you do"],
        answer:
          "I specialize in full-stack web development, UI/UX design, Shopify Liquid customization, WordPress, PHP/MySQL, JavaScript functions, API integrations, multimedia editing, PC troubleshooting, and AI-powered tools like Lovable, Readdy, Cursor, Windsurf, ChatGPT, Gemini, and more.",
      },
      {
        keywords: ["projects", "portfolio", "samples", "what have you built", "show work"],
        answer:
          "Some of my featured projects include:\n• JS Name Animation (lightning + explosion effect)\n• Frameworks Comparison Tool\n• Snake Game with AI Wall\n• Minimal Store Designs\n• PC Parts Script Builder\n• Discount Generator + Countdown\nAll projects are interactive, responsive, and built with clean code.",
      },
      {
        keywords: ["services", "offer", "what do you provide", "hire you", "work"],
        answer:
          "I offer website development, Shopify custom Liquid builds, WordPress setup, JavaScript functions, API integration, UI/UX design, AI web builder development, video/photo editing, and PC troubleshooting services. I can handle both small and large projects.",
      },
      {
        keywords: ["experience", "work history", "job", "background"],
        answer:
          "I have experience as an IT Specialist, Graphic Artist, Video Editor, and Freelance Full-Stack Developer. I’ve handled printing shops, multimedia work, website creation, AI content, Facebook Ads, and technical troubleshooting. My work covers both digital and technical fields.",
      },
      {
        keywords: ["education", "school", "college", "degree", "study"],
        answer:
          "I graduated with a Bachelor of Science in Information Technology from Carlos Hilado Memorial State College. I also completed OJT as an IT Specialist handling MySQL, XAMPP, maintenance, and data operations.",
      },
      {
        keywords: ["contact", "email", "location", "connect", "hire"],
        answer:
          "You can reach me at:\n📧 Email: ken4droidph@gmail.com\n📱 Mobile: 0961-043-9927 / 0992-376-5624\n📍 Location: Bacolod City, Philippines",
      },
      {
        keywords: ["availability", "schedule", "when", "hire", "time"],
        answer:
          "I am available for freelance, part-time, or project-based work. My schedule is flexible depending on project requirements.",
      },
      {
        keywords: ["ai", "chatbot", "api", "groq", "openai"],
        answer:
          "Yes, I can build custom AI chatbots using Groq API, OpenAI, Gemini, or local models. I can also restrict the AI to specific topics and integrate it into websites, apps, or Shopify stores.",
      },
    ];

    const matchedRule = keywordRules.find((rule) =>
      rule.keywords.some((keyword) => lower.includes(keyword))
    );

    if (matchedRule) {
      setMessages((prev) => {
        const updated: ChatMessage[] = [...prev, { role: "assistant", content: matchedRule.answer }];
        persistMessages(updated);
        return updated;
      });
      setIsSending(false);
      return;
    }

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
              content: `You are KEN BOT, an AI assistant created by Keneth Gepanaga. Your task is to answer questions ONLY about Keneth Gepanaga19s professional background, skills, experience, resume, portfolio, projects, AI tools he uses, web design, programming, and his website content (KEN & AI).

Rules:
1. ONLY answer questions related to Keneth Gepanaga's resume, skills, work experience, portfolio projects, AI tools, programming skills (HTML, CSS, JavaScript, PHP, MySQL, Shopify Liquid, WordPress, Supabase, etc.), web design and development, and his published website content.
2. If a user asks a question outside these topics or without a supported keyword, respond exactly with: "Apologies, your question doesn't match any supported topic. Please try again using a relevant keyword."
3. Maintain a professional but friendly and approachable tone.
4. Use clear and concise language, suitable for beginners or non-technical users.
5. Provide examples or explanations related to Keneth19s work whenever possible.
6. Refer to yourself as "KEN BOT" in all replies.
7. Keep responses helpful and focused on the topics above. Do not provide opinions on unrelated matters.`,
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
        {!isAllProject && (
          <Gallery showViewAllButton={false} titleUnderImage={false} />
        )}

        {isAllProject && (
          <>
            <section className="relative pt-32 pb-24 overflow-hidden">
              <div className="light-orb w-96 h-96 top-0 left-1/4" />
              <div className="accent-orb w-[600px] h-[600px] bottom-0 right-0 translate-x-1/2" />

              <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-10 space-y-4"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Web Design &<span className="gradient-text"> JS Function</span>
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                    Toggle between split view or focus on Web Design or JS Function projects.
                  </p>

                  <div className="flex justify-center">
                    <div className="inline-flex items-center rounded-full bg-secondary/60 p-1">
                      <button
                        type="button"
                        onClick={() => setViewMode("split")}
                        className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                          viewMode === "split"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Split View
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("web")}
                        className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                          viewMode === "web"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Web Design
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode("js")}
                        className={`px-4 py-1.5 text-xs md:text-sm rounded-full transition-colors ${
                          viewMode === "js"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        JS Function
                      </button>
                    </div>
                  </div>
                </motion.div>

                <div className="relative mt-8">
                  {viewMode === "split" && <div className="center-divider" />}

                  <div className={viewMode === "split" ? "grid md:grid-cols-2 gap-8" : ""}>
                    {viewMode === "split" && (
                      <>
                        <div className="pr-4 space-y-4">
                          <h3 className="text-lg font-semibold text-foreground mb-2 text-center md:text-left">
                            Web Design
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {webDesignItems.map((item) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 cursor-pointer"
                                onClick={() => handleGalleryItemClick(item)}
                              >
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                </div>
                                <div className="p-3">
                                  <p className="text-[10px] uppercase tracking-wide text-primary">
                                    {item.category}
                                  </p>
                                  <h4 className="mt-1 text-sm font-semibold text-foreground line-clamp-2">
                                    {item.title}
                                  </h4>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="pl-4 space-y-4 mt-10 md:mt-0">
                          <h3 className="text-lg font-semibold text-foreground mb-2 text-center md:text-left">
                            JS Function
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {jsFunctionItems.map((item) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 cursor-pointer"
                                onClick={() => handleGalleryItemClick(item)}
                              >
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                </div>
                                <div className="p-3">
                                  <p className="text-[10px] uppercase tracking-wide text-primary">
                                    {item.category}
                                  </p>
                                  <h4 className="mt-1 text-sm font-semibold text-foreground line-clamp-2">
                                    {item.title}
                                  </h4>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {viewMode === "web" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {webViewItems.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ y: -6, scale: 1.02 }}
                              transition={{ duration: 0.3 }}
                              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 cursor-pointer"
                              onClick={() => handleGalleryItemClick(item)}
                            >
                              <div className="aspect-[4/3] overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              </div>
                              <div className="p-3">
                                <p className="text-[10px] uppercase tracking-wide text-primary">
                                  {item.category}
                                </p>
                                <h4 className="mt-1 text-sm font-semibold text-foreground line-clamp-2">
                                  {item.title}
                                </h4>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {viewMode === "js" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {jsViewItems.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ y: -6, scale: 1.02 }}
                              transition={{ duration: 0.3 }}
                              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 cursor-pointer"
                              onClick={() => handleGalleryItemClick(item)}
                            >
                              <div className="aspect-[4/3] overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              </div>
                              <div className="p-3">
                                <p className="text-[10px] uppercase tracking-wide text-primary">
                                  {item.category}
                                </p>
                                <h4 className="mt-1 text-sm font-semibold text-foreground line-clamp-2">
                                  {item.title}
                                </h4>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {isChatOpen && !isScrolling && (
              <div className="fixed top-24 left-2 right-2 sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto z-50 w-auto sm:w-64 rounded-2xl bg-background/95 text-foreground shadow-lg border border-orange-400 overflow-hidden flex flex-col">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-3 bg-orange-500 text-white cursor-pointer"
                >
                  <img
                    src={chatbotBotIcon}
                    alt="KEN AI"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-base font-bold tracking-wide">KEN AI</span>
                </button>

                <div className="p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-end mb-1">
                    <button
                      type="button"
                      onClick={handleClearTopicAndHistory}
                      className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
                    >
                      <span>Remove Topic</span>
                      <X size={10} weight="bold" />
                    </button>
                  </div>

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
                                alt="KEN AI"
                                className="w-7 h-7 rounded-full mt-0.5"
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
