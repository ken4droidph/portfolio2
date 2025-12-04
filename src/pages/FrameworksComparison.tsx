import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cpuImg from "@/components/images/cpu.jpg";
import gpuImg from "@/components/images/gpu.jpg";
import ramImg from "@/components/images/ram.jpg";
import motherboardImg from "@/components/images/motherboard.jpg";
import storageImg from "@/components/images/storage.jpg";
import powersupplyImg from "@/components/images/powersupply.jpg";
import keyboardImg from "@/components/images/keyboard.jpg";

const FrameworksComparison = () => {
  const location = useLocation();
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

        if (window.location.hash) {
          const id = window.location.hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            const headerOffset = 96;
            const rect = el.getBoundingClientRect();
            const offset = rect.top + window.scrollY - headerOffset;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }
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

  useEffect(() => {
    const calcScreen = document.getElementById("calcScreen") as HTMLInputElement | null;
    const calcButtons = document.querySelectorAll<HTMLButtonElement>("#calcButtons button");
    let calcExp = "";

    const handleCalcClick = (btn: HTMLButtonElement) => {
      if (!calcScreen) return;
      const val = btn.textContent || "";
      if (val === "=") {
        try {
          // eslint-disable-next-line no-eval
          // @ts-ignore
          calcExp = eval(calcExp).toString();
        } catch {
          calcExp = "Error";
        }
      } else if (val === "C") {
        calcExp = "";
      } else if (val === "⟵") {
        calcExp = calcExp.slice(0, -1);
      } else {
        calcExp += val;
      }
      calcScreen.value = calcExp;
    };

    const calcHandlers: Array<[(e: MouseEvent) => void, HTMLButtonElement]> = [];
    calcButtons.forEach((btn) => {
      const handler = () => handleCalcClick(btn);
      calcHandlers.push([handler, btn]);
      btn.addEventListener("click", handler);
    });

    const todoForm = document.getElementById("todoForm") as HTMLFormElement | null;
    const todoInput = document.getElementById("todoInput") as HTMLInputElement | null;
    const todoList = document.getElementById("todoList") as HTMLUListElement | null;

    let todoSubmitHandler: ((e: Event) => void) | null = null;
    if (todoForm && todoInput && todoList) {
      todoSubmitHandler = (e: Event) => {
        e.preventDefault();
        const task = todoInput.value.trim();
        if (!task) return;
        const li = document.createElement("li");
        li.textContent = task;
        li.addEventListener("click", () => li.classList.toggle("completed"));
        li.addEventListener("dblclick", () => li.remove());
        todoList.appendChild(li);
        todoInput.value = "";
      };
      todoForm.addEventListener("submit", todoSubmitHandler);
    }

    const sliderImg = document.querySelector<HTMLImageElement>("#slider img");
    const prev = document.getElementById("prev") as HTMLButtonElement | null;
    const next = document.getElementById("next") as HTMLButtonElement | null;

    let sliderInterval: number | undefined;
    if (sliderImg && prev && next) {
      const slides = [
        "https://picsum.photos/300/200?random=1",
        "https://picsum.photos/300/200?random=2",
        "https://picsum.photos/300/200?random=3",
      ];
      let current = 0;

      const updateSlide = () => {
        sliderImg.src = slides[current];
      };

      prev.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        updateSlide();
      });

      next.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        updateSlide();
      });

      sliderInterval = window.setInterval(() => {
        current = (current + 1) % slides.length;
        updateSlide();
      }, 5000);
    }

    const ball = document.getElementById("ball") as HTMLDivElement | null;
    const container = document.getElementById("ballContainer") as HTMLDivElement | null;

    let ballAnimationId: number | undefined;
    if (ball && container) {
      let posX = 50;
      let posY = 50;
      let velocityX = 3;
      let velocityY = 3;
      const gravity = 0.5;
      const bounce = 0.7;
      let dragging = false;
      let offsetX = 0;
      let offsetY = 0;

      const randomVelocity = () => {
        velocityX = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1);
        velocityY = (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1);
      };

      randomVelocity();

      const animateBall = () => {
        if (!dragging) {
          const floor = container.clientHeight - ball.offsetHeight;
          const rightWall = container.clientWidth - ball.offsetWidth;
          posX += velocityX;
          posY += velocityY;
          velocityY += gravity;
          if (posY > floor) {
            posY = floor;
            velocityY *= -bounce;
          }
          if (posY < 0) {
            posY = 0;
            velocityY *= -bounce;
          }
          if (posX > rightWall) {
            posX = rightWall;
            velocityX *= -bounce;
          }
          if (posX < 0) {
            posX = 0;
            velocityX *= -bounce;
          }
          ball.style.left = `${posX}px`;
          ball.style.top = `${posY}px`;
        }
        ballAnimationId = requestAnimationFrame(animateBall);
      };

      ballAnimationId = requestAnimationFrame(animateBall);

      const handleMouseDown = (e: MouseEvent) => {
        dragging = true;
        ball.classList.add("dragging");
        const rect = ball.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
          const containerRect = container.getBoundingClientRect();
          posX = e.clientX - offsetX - containerRect.left;
          posY = e.clientY - offsetY - containerRect.top;
          if (posX < 0) posX = 0;
          if (posY < 0) posY = 0;
          ball.style.left = `${posX}px`;
          ball.style.top = `${posY}px`;
        }
      };

      const handleMouseUp = () => {
        if (dragging) {
          dragging = false;
          ball.classList.remove("dragging");
          randomVelocity();
        }
      };

      ball.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    let score = 0;
    const maxKills = 10;
    const snakeScoreEl = document.getElementById("snakeScore");
    const funRoot = document.querySelector(".fun-root") as HTMLDivElement | null;
    let snakeInterval: number | undefined;

    if (snakeScoreEl && funRoot) {
      const updateScoreUI = () => {
        snakeScoreEl.textContent = `Score: ${score}`;
      };

      const spawnSnake = () => {
        if (score >= maxKills) return;

        const s = document.createElement("div");
        s.className = "snake";
        s.textContent = "🐍";

        const containerRect = funRoot.getBoundingClientRect();
        const maxWidth = funRoot.clientWidth - 40;
        const startX = Math.random() * (maxWidth > 0 ? maxWidth : 0);
        s.style.left = `${startX}px`;
        s.style.fontSize = `${Math.random() * 26 + 30}px`;
        s.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        funRoot.appendChild(s);

        let pos = -60;
        const speed = Math.random() * 1.8 + 0.8;

        const step = () => {
          if (score >= maxKills) {
            s.remove();
            return;
          }
          pos += speed;
          s.style.top = `${pos}px`;
          requestAnimationFrame(step);
        };

        s.addEventListener("click", (e) => {
          score += 1;
          updateScoreUI();
          const boom = document.createElement("div");
          boom.textContent = "💥";
          boom.style.position = "fixed";
          const mouseEvent = e as MouseEvent;
          boom.style.left = `${mouseEvent.clientX - 20}px`;
          boom.style.top = `${mouseEvent.clientY - 40}px`;
          boom.style.fontSize = "28px";
          boom.style.pointerEvents = "none";
          document.body.appendChild(boom);
          setTimeout(() => boom.remove(), 300);
          s.remove();

          if (score >= maxKills) {
            if (snakeInterval !== undefined) {
              clearInterval(snakeInterval);
            }
            document.querySelectorAll(".snake").forEach((n) => n.remove());
          }
        });

        step();
      };

      const startSpawning = (intervalMs = 1300) => {
        snakeInterval = window.setInterval(spawnSnake, intervalMs);
      };

      updateScoreUI();
      startSpawning(1300);
    }

    return () => {
      if (sliderInterval !== undefined) {
        clearInterval(sliderInterval);
      }
      if (snakeInterval !== undefined) {
        clearInterval(snakeInterval);
      }
      if (ballAnimationId !== undefined) {
        cancelAnimationFrame(ballAnimationId);
      }
      calcHandlers.forEach(([handler, btn]) => {
        btn.removeEventListener("click", handler);
      });
      if (todoForm && todoSubmitHandler) {
        todoForm.removeEventListener("submit", todoSubmitHandler);
      }
    };
  }, []);

  useEffect(() => {
    const mediaRoot = document.querySelector(".media-root") as HTMLDivElement | null;
    if (!mediaRoot) return;

    const mapEl = document.getElementById("map") as HTMLDivElement | null;
    const clockEl = document.getElementById("clock") as HTMLDivElement | null;
    const overlay = document.getElementById("overlay") as HTMLDivElement | null;
    const exitBtn = document.getElementById("exit-btn") as HTMLButtonElement | null;
    const items = mediaRoot.querySelectorAll<HTMLDivElement>(".grid-item");
    const videoBtn = document.getElementById("video-btn") as HTMLButtonElement | null;
    const videoItem = document.getElementById("video-item") as HTMLDivElement | null;

    let clockInterval: number | undefined;
    let leafletMap: any = null;
    let player: any = null;

    const ensureScript = (id: string, src: string) =>
      new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
          if (existing.getAttribute("data-loaded") === "true") {
            resolve();
          } else {
            existing.addEventListener("load", () => resolve());
          }
          return;
        }
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.onload = () => {
          script.setAttribute("data-loaded", "true");
          resolve();
        };
        script.onerror = () => reject();
        document.body.appendChild(script);
      });

    if (clockEl) {
      const updateClock = () => {
        clockEl.textContent = new Date().toLocaleTimeString();
      };
      updateClock();
      clockInterval = window.setInterval(updateClock, 1000);
    }

    if (mapEl) {
      ensureScript("leaflet-script", "https://unpkg.com/leaflet/dist/leaflet.js")
        .then(() => {
          const L = (window as any).L;
          if (!L) return;
          leafletMap = L.map(mapEl).setView([10.669025087733806, 122.94915310796878], 13);
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(leafletMap);
          L.marker([10.669025087733806, 122.94915310796878])
            .addTo(leafletMap)
            .bindPopup("Bacolod City")
            .openPopup();
        })
        .catch(() => {});
    }

    ensureScript("youtube-iframe-api", "https://www.youtube.com/iframe_api")
      .then(() => {
        const w = window as any;
        const YT = w.YT;
        if (YT) {
          player = new YT.Player("yt-video");
        } else {
          w.onYouTubeIframeAPIReady = () => {
            const YTInstance = (window as any).YT;
            player = new YTInstance.Player("yt-video");
          };
        }
      })
      .catch(() => {});

    const itemClickHandlers: Array<[(e: MouseEvent) => void, HTMLElement]> = [];
    let overlayClickHandler: (() => void) | null = null;
    let exitBtnClickHandler: (() => void) | null = null;
    let videoBtnHandler: ((e: MouseEvent) => void) | null = null;

    if (overlay && exitBtn && items.length > 0) {
      const exitFocus = () => {
        items.forEach((i) => i.classList.remove("focused"));
        items.forEach((i) => {
          (i as HTMLElement).style.opacity = "1";
        });
        overlay.style.display = "none";
        exitBtn.style.display = "none";
        if (player && player.pauseVideo) {
          player.pauseVideo();
        }
      };

      items.forEach((item) => {
        const handler = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (target && target.tagName === "BUTTON") return;
          items.forEach((i) => i.classList.remove("focused"));
          item.classList.add("focused");
          overlay.style.display = "block";
          exitBtn.style.display = "block";
          items.forEach((i) => {
            (i as HTMLElement).style.opacity = i === item ? "1" : "0.3";
          });
          if (item.id === "map-item" && leafletMap && leafletMap.invalidateSize) {
            setTimeout(() => leafletMap.invalidateSize(), 300);
          }
        };
        item.addEventListener("click", handler);
        itemClickHandlers.push([handler, item as HTMLElement]);
      });

      overlayClickHandler = () => exitFocus();
      exitBtnClickHandler = () => exitFocus();
      overlay.addEventListener("click", overlayClickHandler);
      exitBtn.addEventListener("click", exitBtnClickHandler);

      if (videoBtn && videoItem) {
        videoBtnHandler = () => {
          items.forEach((i) => i.classList.remove("focused"));
          videoItem.classList.add("focused");
          overlay.style.display = "block";
          exitBtn.style.display = "block";
          items.forEach((i) => {
            (i as HTMLElement).style.opacity = i === videoItem ? "1" : "0.3";
          });

          if (player && player.getPlayerState) {
            const state = player.getPlayerState();
            const YTInstance = (window as any).YT;
            if (state === YTInstance.PlayerState.PLAYING) {
              player.pauseVideo();
            } else {
              player.playVideo();
            }
          }
        };
        videoBtn.addEventListener("click", videoBtnHandler);
      }
    }

    return () => {
      if (clockInterval !== undefined) {
        window.clearInterval(clockInterval);
      }
      itemClickHandlers.forEach(([handler, el]) => {
        el.removeEventListener("click", handler);
      });
      if (overlay && overlayClickHandler) {
        overlay.removeEventListener("click", overlayClickHandler);
      }
      if (exitBtn && exitBtnClickHandler) {
        exitBtn.removeEventListener("click", exitBtnClickHandler);
      }
      if (videoBtn && videoBtnHandler) {
        videoBtn.removeEventListener("click", videoBtnHandler);
      }
    };
  }, []);

  useEffect(() => {
    const storeRoot = document.getElementById("pc-store-root") as HTMLDivElement | null;
    if (!storeRoot) return;

    const inputs = storeRoot.querySelectorAll<HTMLInputElement>('input[type="radio"]');
    const totalEl = document.getElementById("total-price");
    const finalBox = document.getElementById("final-box") as HTMLDivElement | null;
    const finalPriceEl = document.getElementById("final-price");
    const addBtn = document.getElementById("add-cart");

    if (!totalEl || !finalBox || !finalPriceEl || !addBtn) return;

    let currentTotal = 0;

    const calculateTotal = () => {
      let total = 0;
      inputs.forEach((input) => {
        if (input.checked) {
          const value = parseInt(input.value, 10);
          if (!Number.isNaN(value)) {
            total += value;
          }
        }
      });
      currentTotal = total;
      totalEl.textContent = String(total);
    };

    calculateTotal();

    const inputHandlers: Array<[(e: Event) => void, HTMLInputElement]> = [];
    inputs.forEach((input) => {
      const handler = () => calculateTotal();
      input.addEventListener("change", handler);
      inputHandlers.push([handler, input]);
    });

    const addClickHandler = () => {
      finalBox.style.display = "block";
      finalPriceEl.textContent = String(currentTotal);
    };

    addBtn.addEventListener("click", addClickHandler);

    return () => {
      inputHandlers.forEach(([handler, el]) => {
        el.removeEventListener("change", handler);
      });
      addBtn.removeEventListener("click", addClickHandler);
    };
  }, []);

  useEffect(() => {
    const dealRoot = document.querySelector(".deal-root") as HTMLDivElement | null;
    if (!dealRoot) return;

    const oldPriceSpan = document.getElementById("oldPrice");
    const newPriceSpan = document.getElementById("newPrice");
    const discountSpan = document.getElementById("discountPercent");
    const oldPriceInput = document.getElementById("oldPriceInput") as HTMLInputElement | null;
    const newPriceInput = document.getElementById("newPriceInput") as HTMLInputElement | null;
    const datePicker = document.getElementById("datePicker") as HTMLInputElement | null;
    const countdownText = document.getElementById("countdownText");
    const saveOldBtn = document.getElementById("saveOldPriceBtn") as HTMLButtonElement | null;
    const saveNewBtn = document.getElementById("saveNewPriceBtn") as HTMLButtonElement | null;
    const setCountdownBtn = document.getElementById("setCountdownBtn") as HTMLButtonElement | null;

    if (!oldPriceSpan || !newPriceSpan || !discountSpan || !countdownText) return;
    if (!saveOldBtn || !saveNewBtn || !setCountdownBtn) return;

    let oldPrice = 120;
    let newPrice = 80;

    const calculateDiscount = () => {
      if (oldPrice <= 0) {
        discountSpan.textContent = "0%";
        return;
      }
      const discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
      discountSpan.textContent = `-${discount}%`;
    };

    const handleSaveOld = () => {
      if (!oldPriceInput) return;
      const value = parseFloat(oldPriceInput.value);
      if (!value || value <= 0) return;
      oldPrice = value;
      oldPriceSpan.textContent = `$${oldPrice}`;
      calculateDiscount();
    };

    const handleSaveNew = () => {
      if (!newPriceInput) return;
      const value = parseFloat(newPriceInput.value);
      if (!value || value <= 0) return;
      newPrice = value;
      newPriceSpan.textContent = `$${newPrice}`;
      calculateDiscount();
    };

    let countdownDate: number | null = null;
    let timer: number | undefined;

    const updateCountdown = () => {
      if (!countdownDate) return;
      const now = new Date().getTime();
      const diff = countdownDate - now;

      if (diff <= 0) {
        countdownText.textContent = "Countdown finished!";
        if (timer !== undefined) {
          window.clearInterval(timer);
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      countdownText.textContent = `${days}d  ${hours}h  ${mins}m  ${secs}s`;
    };

    const handleSetCountdown = () => {
      if (!datePicker) return;
      const dateValue = datePicker.value;
      if (!dateValue) {
        countdownText.textContent = "Please select a date.";
        return;
      }

      countdownDate = new Date(dateValue).getTime();
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
      timer = window.setInterval(updateCountdown, 1000);
    };

    calculateDiscount();

    saveOldBtn.addEventListener("click", handleSaveOld);
    saveNewBtn.addEventListener("click", handleSaveNew);
    setCountdownBtn.addEventListener("click", handleSetCountdown);

    return () => {
      saveOldBtn.removeEventListener("click", handleSaveOld);
      saveNewBtn.removeEventListener("click", handleSaveNew);
      setCountdownBtn.removeEventListener("click", handleSetCountdown);
      if (timer !== undefined) {
        window.clearInterval(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96;
    const rect = el.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerOffset;
    window.scrollTo({ top: offset, behavior: "smooth" });
  }, [location]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 overflow-x-hidden">
        <section id="section1" className="w-full h-full">
          <iframe
            ref={iframeRef}
            src={src}
            onLoad={handleLoad}
            title="Frameworks & Libraries Comparison"
            className="w-full h-full bg-white"
          />
        </section>

        <section id="section2" className="w-full mt-16">
          <style>{`
            .fun-root,
            .fun-root * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .fun-root {
              min-height: 100vh;
              background: linear-gradient(135deg, #89f7fe, #66a6ff);
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              align-items: flex-start;
              gap: 20px;
              padding: 20px;
              position: relative;
              overflow: hidden;
            }

            .fun-root .card {
              background: rgba(255, 255, 255, 0.95);
              border-radius: 15px;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
              padding: 20px;
              flex: 1 1 300px;
              max-width: 350px;
              transition: transform 0.3s ease;
              position: relative;
            }

            .fun-root .card:hover {
              transform: translateY(-5px);
            }

            .fun-root h2 {
              margin-bottom: 10px;
              color: #333;
              text-align: center;
            }

            .fun-root #calculator {
              display: flex;
              flex-direction: column;
              gap: 10px;
            }

            .fun-root #calcScreen {
              height: 40px;
              font-size: 1.2rem;
              padding: 5px;
              text-align: right;
              border-radius: 5px;
              border: 1px solid #ccc;
              color: #000;
            }

            .fun-root #calcButtons {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 5px;
            }

            .fun-root #calcButtons button {
              padding: 15px;
              font-size: 1rem;
              border-radius: 5px;
              border: none;
              background: #66a6ff;
              color: #fff;
              cursor: pointer;
              transition: background 0.2s;
            }

            .fun-root #calcButtons button:hover {
              background: #89f7fe;
            }

            .fun-root #todoForm {
              display: flex;
              gap: 5px;
              margin-bottom: 10px;
            }

            .fun-root #todoInput {
              flex: 1;
              padding: 8px;
              border-radius: 5px;
              border: 1px solid #ccc;
              color: #000;
            }

            .fun-root #todoForm button {
              padding: 8px 12px;
              border: none;
              border-radius: 5px;
              background: #e74c3c;
              color: #fff;
              cursor: pointer;
            }

            .fun-root #todoList {
              list-style: none;
              max-height: 200px;
              overflow-y: auto;
              margin-top: 8px;
            }

            .fun-root #todoList li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 5px 8px;
              margin-bottom: 5px;
              background: #f0f0f0;
              border-radius: 5px;
              transition: transform 0.2s;
              color: #000;
            }

            .fun-root #todoList li.completed {
              text-decoration: line-through;
              opacity: 0.6;
            }

            .fun-root #slider {
              position: relative;
              overflow: hidden;
              border-radius: 10px;
            }

            .fun-root #slider img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              border-radius: 10px;
              transition: transform 0.5s;
            }

            .fun-root #slider button {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
              border: none;
              padding: 8px 12px;
              cursor: pointer;
              border-radius: 5px;
            }

            .fun-root #prev {
              left: 10px;
            }

            .fun-root #next {
              right: 10px;
            }

            .fun-root #ballContainer {
              width: 100%;
              height: 300px;
              position: relative;
              border-radius: 15px;
              background: rgba(240, 240, 240, 0.3);
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .fun-root #ball {
              position: absolute;
              width: 90px;
              height: 90px;
              background-color: #ff4a13;
              border-radius: 50%;
              cursor: grab;
              z-index: 5;
            }

            .fun-root #ball.dragging {
              cursor: grabbing;
            }

            .fun-root #ballText {
              position: absolute;
              top: 110px;
              left: 50%;
              transform: translateX(-50%);
              font-weight: bold;
              color: #333;
            }

            .fun-root #bottomTitle {
              width: 100%;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              margin-top: 10px;
              color: #222;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.18);
            }

            .fun-root #snakeScore {
              width: 100%;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              color: #ff0000;
            }

            .fun-root .snake {
              position: absolute;
              top: -60px;
              font-size: 44px;
              user-select: none;
              cursor: pointer;
              transition: transform 0.15s linear;
              z-index: 4;
            }

            .fun-root .snake:active {
              transform: scale(0.6);
            }

            @media (max-width: 768px) {
              .fun-root .card {
                max-width: 95%;
              }
            }
          `}</style>

          <div className="fun-root">
            <div className="card">
              <h2>Calculator</h2>
              <div id="calculator">
                <input type="text" id="calcScreen" readOnly />
                <div id="calcButtons">
                  <button>7</button>
                  <button>8</button>
                  <button>9</button>
                  <button>/</button>
                  <button>4</button>
                  <button>5</button>
                  <button>6</button>
                  <button>*</button>
                  <button>1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>-</button>
                  <button>0</button>
                  <button>.</button>
                  <button>=</button>
                  <button>+</button>
                  <button>C</button>
                  <button>⟵</button>
                </div>
              </div>
            </div>

            <div className="card">
              <h2>Todo List</h2>
              <form id="todoForm">
                <input type="text" id="todoInput" placeholder="Add a task..." />
                <button type="submit">Add</button>
              </form>
              <ul id="todoList" />
            </div>

            <div className="card">
              <h2>Random Image Slider</h2>
              <div id="slider">
                <img src="https://picsum.photos/300/200?random=1" alt="Slide 1" />
                <button id="prev">&#10094;</button>
                <button id="next">&#10095;</button>
              </div>
            </div>

            <div className="card">
              <h2>Drag Ball</h2>
              <div id="ballContainer">
                <div id="ball" />
                <div id="ballText">Drag Ball</div>
              </div>
            </div>

            <div id="bottomTitle">
              <b>Kill 10 snakes to clear the screen.</b>
            </div>
            <div id="snakeScore">Score: 0</div>
          </div>
        </section>

        <section id="section3" className="w-full mt-16">
          <style>{`
            .media-root {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #f0f4f8;
              color: #333;
              padding: 20px;
            }

            .media-root h1 {
              text-align: center;
              margin: 20px 0;
              color: #2c3e50;
              text-shadow: 1px 1px 2px #bdc3c7;
              animation: fadeIn 2s ease-in-out;
            }

            .media-root .dashboard {
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 15px;
              margin: 20px auto;
              height: calc(100vh - 100px);
              max-width: 1100px;
              transition: all 0.3s ease;
            }

            .media-root .grid-item {
              background: linear-gradient(135deg, #74ebd5, #acb6e5);
              border-radius: 15px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              animation: slideUp 1s ease-in-out;
              padding: 10px;
              cursor: pointer;
              transition: transform 0.5s ease, z-index 0.5s ease, opacity 0.5s ease, height 0.5s ease;
            }

            .media-root .grid-item h2 {
              margin-bottom: 10px;
              color: #fff;
              text-shadow: 1px 1px 2px #2c3e50;
              font-size: 1.5em;
              animation: fadeIn 1.5s ease-in-out;
              z-index: 1;
            }

            .media-root #map,
            .media-root .audio-wrapper,
            .media-root .clock-wrapper {
              width: 95%;
              height: calc(100% - 50px);
              border-radius: 10px;
            }

            .media-root .controls {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }

            .media-root button {
              padding: 8px 15px;
              font-size: 1em;
              border: none;
              border-radius: 8px;
              background: #3498db;
              color: #fff;
              cursor: pointer;
              transition: 0.3s;
              margin-top: 5px;
            }

            .media-root button:hover {
              background: #2980b9;
            }

            .media-root #clock {
              font-size: 2.5em;
              font-weight: bold;
              color: #fff;
              text-shadow: 1px 1px 2px #2c3e50;
              animation: pulse 2s infinite;
            }

            .media-root .video-wrapper {
              position: relative;
              width: 95%;
              height: calc(100% - 50px);
            }

            .media-root .video-wrapper iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 10px;
              object-fit: cover;
            }

            .media-root .focused {
              position: fixed !important;
              top: 50% !important;
              left: 50% !important;
              width: 90% !important;
              height: 90% !important;
              transform: translate(-50%, -50%) !important;
              z-index: 999 !important;
              border-radius: 20px;
              display: flex !important;
              flex-direction: column !important;
              justify-content: flex-start !important;
              align-items: center !important;
            }

            .media-root .focused #map,
            .media-root .focused .audio-wrapper,
            .media-root .focused .clock-wrapper,
            .media-root .focused .video-wrapper {
              height: calc(100% - 50px) !important;
            }

            .media-root .overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              z-index: 998;
              display: none;
            }

            .media-root #exit-btn {
              position: fixed;
              top: 20px;
              right: 20px;
              padding: 10px 15px;
              font-size: 1.5em;
              background: #e74c3c;
              color: #fff;
              border: none;
              border-radius: 50%;
              display: none;
              z-index: 1000;
              cursor: pointer;
            }

            @keyframes slideUp {
              0% {
                transform: translateY(50px);
                opacity: 0;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }

            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes pulse {
              0%,
              100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
            }

            @media (max-width: 768px) {
              .media-root {
                padding: 16px;
              }

              .media-root .dashboard {
                grid-template-columns: 1fr;
                grid-template-rows: repeat(4, auto);
                height: auto;
                margin: 10px auto;
              }

              .media-root .grid-item {
                padding: 12px;
              }

              .media-root #map,
              .media-root .audio-wrapper,
              .media-root .clock-wrapper,
              .media-root .video-wrapper {
                width: 100%;
                height: 260px;
              }
            }
          `}</style>

          <div className="media-root">
            <h1>My Multimedia Dashboard</h1>
            <div className="dashboard">
              <div className="grid-item" id="map-item">
                <h2>My Address Bacolod City</h2>
                <div id="map" />
              </div>

              <div className="grid-item" id="audio-item">
                <h2>Audio Player</h2>
                <div className="controls audio-wrapper">
                  <audio
                    id="audio"
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    controls
                  />
                </div>
              </div>

              <div className="grid-item" id="video-item">
                <h2>YouTube Video</h2>
                <div className="controls video-wrapper">
                  <iframe
                    id="yt-video"
                    src="https://www.youtube.com/embed/DzCMAoREVTc?enablejsapi=1"
                    title="Paano Nabuo ang Unang Code sa Mundo? | History ng Programming"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button id="video-btn">Play / Focus Video</button>
                </div>
              </div>

              <div className="grid-item" id="clock-item">
                <h2>Live Clock</h2>
                <div className="controls clock-wrapper">
                  <div id="clock" />
                </div>
              </div>
            </div>

            <div className="overlay" id="overlay" />
            <button id="exit-btn">✕</button>
          </div>
        </section>

        <section id="section4" className="w-full mt-16">
          <style>{`
            .pc-store-root,
            .pc-store-root * {
              box-sizing: border-box;
            }

            .pc-store-root {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              color: #333;
              padding: 20px;
              border-radius: 16px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              max-width: 1200px;
              margin: 0 auto;
            }

            .pc-store-root h1 {
              text-align: center;
              margin-bottom: 30px;
              color: #111;
            }

            .pc-store-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
            }

            .pc-product-card {
              background: #fff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              transition: transform 0.3s, box-shadow 0.3s;
              padding: 15px;
            }

            .pc-product-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            }

            .pc-product-card img {
              width: 100%;
              height: 150px;
              object-fit: cover;
              border-radius: 5px;
              margin-bottom: 10px;
            }

            .pc-product-card h3 {
              font-size: 1.1rem;
              margin-bottom: 10px;
            }

            .pc-product-card label {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              cursor: pointer;
              font-size: 0.9rem;
            }

            .pc-total-cart,
            .pc-final-cart {
              margin-top: 30px;
              background: #fff;
              padding: 20px;
              border-radius: 10px;
              font-weight: bold;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              text-align: center;
            }

            .pc-add-to-cart-btn {
              margin-top: 20px;
              width: 100%;
              padding: 15px;
              background: #111;
              color: #fff;
              font-size: 16px;
              font-weight: bold;
              border: none;
              border-radius: 10px;
              cursor: pointer;
              transition: 0.3s;
            }

            .pc-add-to-cart-btn:hover {
              background: #333;
            }

            @media (max-width: 600px) {
              .pc-product-card img {
                height: 120px;
              }
            }
          `}</style>

          <div className="pc-store-root" id="pc-store-root">
            <h1>PC Parts Store - Script Builder</h1>

            <div className="pc-store-grid">
              <div className="pc-product-card">
                <img src={cpuImg} alt="CPU" />
                <h3>Select CPU</h3>
                <label>
                  No CPU (0)
                  <input type="radio" name="cpu" value="0" />
                </label>
                <label>
                  Intel i9 13900K ($500)
                  <input type="radio" name="cpu" value="500" defaultChecked />
                </label>
                <label>
                  AMD Ryzen 9 7950X ($450)
                  <input type="radio" name="cpu" value="450" />
                </label>
                <label>
                  Intel i7 13700K ($350)
                  <input type="radio" name="cpu" value="350" />
                </label>
              </div>

              <div className="pc-product-card">
                <img src={gpuImg} alt="GPU" />
                <h3>Select GPU</h3>
                <label>
                  No GPU (0)
                  <input type="radio" name="gpu" value="0" />
                </label>
                <label>
                  NVIDIA RTX 4080 ($1200)
                  <input type="radio" name="gpu" value="1200" defaultChecked />
                </label>
                <label>
                  AMD RX 7900 XTX ($1000)
                  <input type="radio" name="gpu" value="1000" />
                </label>
                <label>
                  NVIDIA RTX 4070 Ti ($800)
                  <input type="radio" name="gpu" value="800" />
                </label>
              </div>

              <div className="pc-product-card">
                <img src={ramImg} alt="RAM" />
                <h3>Select RAM</h3>
                <label>
                  No RAM (0)
                  <input type="radio" name="ram" value="0" />
                </label>
                <label>
                  32GB DDR5 ($200)
                  <input type="radio" name="ram" value="200" defaultChecked />
                </label>
                <label>
                  64GB DDR5 ($350)
                  <input type="radio" name="ram" value="350" />
                </label>
                <label>
                  16GB DDR4 ($100)
                  <input type="radio" name="ram" value="100" />
                </label>
              </div>

              <div className="pc-product-card">
                <img src={motherboardImg} alt="Motherboard" />
                <h3>Select Motherboard</h3>
                <label>
                  No Motherboard (0)
                  <input type="radio" name="motherboard" value="0" />
                </label>
                <label>
                  ASUS ROG ($300)
                  <input type="radio" name="motherboard" value="300" defaultChecked />
                </label>
                <label>
                  MSI Tomahawk ($250)
                  <input type="radio" name="motherboard" value="250" />
                </label>
                <label>
                  Gigabyte Aorus ($280)
                  <input type="radio" name="motherboard" value="280" />
                </label>
              </div>

              <div className="pc-product-card">
                <img src={storageImg} alt="Storage" />
                <h3>Select Storage</h3>
                <label>
                  No Storage (0)
                  <input type="radio" name="storage" value="0" />
                </label>
                <label>
                  1TB NVMe SSD ($150)
                  <input type="radio" name="storage" value="150" defaultChecked />
                </label>
                <label>
                  2TB NVMe SSD ($250)
                  <input type="radio" name="storage" value="250" />
                </label>
                <label>
                  500GB SATA SSD ($80)
                  <input type="radio" name="storage" value="80" />
                </label>
              </div>

              <div className="pc-product-card">
                <img src={powersupplyImg} alt="PSU" />
                <h3>Select Power Supply</h3>
                <label>
                  No PSU (0)
                  <input type="radio" name="psu" value="0" />
                </label>
                <label>
                  850W Gold ($120)
                  <input type="radio" name="psu" value="120" defaultChecked />
                </label>
                <label>
                  750W Bronze ($90)
                  <input type="radio" name="psu" value="90" />
                </label>
                <label>
                  1000W Platinum ($200)
                  <input type="radio" name="psu" value="200" />
                </label>
              </div>
            </div>

            <div className="pc-total-cart">
              Current Total: $<span id="total-price">0</span>
            </div>

            <button className="pc-add-to-cart-btn" id="add-cart">
              ADD TO CART
            </button>

            <div className="pc-final-cart" id="final-box" style={{ display: "none" }}>
              Final Price: $<span id="final-price" />
            </div>
          </div>
        </section>

        <section id="section5" className="w-full mt-16">
          <style>{`
            .deal-root,
            .deal-root * {
              box-sizing: border-box;
            }

            .deal-root {
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              padding: 30px;
              display: flex;
              justify-content: center;
            }

            .deal-root .deal-container {
              max-width: 800px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
            }

            .deal-root .deal-box {
              flex: 1;
              min-width: 320px;
              background: #fff;
              border-radius: 12px;
              padding: 20px;
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              text-align: left;
            }

            .deal-root .deal-product-card img {
              width: 100%;
              border-radius: 10px;
              margin-bottom: 15px;
            }

            .deal-root .deal-product-title {
              font-size: 1.4rem;
              margin-bottom: 10px;
              font-weight: bold;
              color: #333;
            }

            .deal-root .deal-price-box {
              margin-top: 10px;
            }

            .deal-root .deal-price-box > div {
              color: #333;
            }

            .deal-root .old-price {
              text-decoration: line-through;
              color: #777;
              font-size: 1rem;
            }

            .deal-root .new-price {
              color: #e60023;
              font-weight: bold;
              font-size: 1.4rem;
            }

            .deal-root .discount-tag {
              display: inline-block;
              background: #e60023;
              color: #fff;
              padding: 5px 10px;
              border-radius: 50px;
              font-size: 0.9rem;
              margin-left: 10px;
              font-weight: bold;
            }

            .deal-root .input-box {
              margin-top: 20px;
            }

            .deal-root input[type="number"],
            .deal-root input[type="date"] {
              width: 100%;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 6px;
              margin-bottom: 10px;
              font-size: 1rem;
              color: #000;
            }

            .deal-root button {
              width: 100%;
              padding: 10px;
              background: #3a66ff;
              color: #fff;
              border: none;
              border-radius: 6px;
              font-size: 1rem;
              font-weight: bold;
              cursor: pointer;
              transition: 0.3s;
              margin-bottom: 10px;
            }

            .deal-root button:hover {
              background: #2d4fcc;
            }

            .deal-root .countdown {
              margin-top: 15px;
              font-size: 1.4rem;
              font-weight: bold;
              color: #333;
            }
          `}</style>

          <div className="deal-root">
            <div className="deal-container">
              <div className="deal-box deal-product-card">
                <img src={keyboardImg} alt="Gaming Mechanical Keyboard" />
                <div className="deal-product-title">Gaming Mechanical Keyboard</div>

                <div className="deal-price-box">
                  <div>
                    Original Price: <span className="old-price" id="oldPrice">$120</span>
                  </div>
                  <div>
                    Discounted Price: <span className="new-price" id="newPrice">$80</span>
                    <span className="discount-tag" id="discountPercent">-33%</span>
                  </div>
                </div>

                <div className="input-box">
                  <input
                    type="number"
                    id="oldPriceInput"
                    placeholder="Enter original price..."
                    min={1}
                  />
                  <button type="button" id="saveOldPriceBtn">
                    Save Original Price
                  </button>

                  <input
                    type="number"
                    id="newPriceInput"
                    placeholder="Enter discounted price..."
                    min={1}
                  />
                  <button type="button" id="saveNewPriceBtn">
                    Save Discounted Price
                  </button>
                </div>
              </div>

              <div className="deal-box">
                <h2 style={{ marginBottom: 15 }}>Countdown Timer</h2>
                <input type="date" id="datePicker" />
                <button type="button" id="setCountdownBtn">
                  Set Countdown
                </button>
                <div className="countdown" id="countdownText">
                  No date selected
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FrameworksComparison;
