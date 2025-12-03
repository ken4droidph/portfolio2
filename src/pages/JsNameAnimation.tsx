import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const JsNameAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      active: boolean;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.vx = 0;
        this.vy = 0;
        this.color = "#ffffff";
        this.active = true;
        this.reset();
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.active = true;
      }

      update(targets: { x: number; y: number; radius: number }[]) {
        if (!this.active) return false;
        let minDist = Infinity;
        let closest: { x: number; y: number; radius: number } | null = null;

        targets.forEach((l) => {
          const dx = l.x - this.x;
          const dy = l.y - this.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) {
            minDist = d;
            closest = l;
          }
        });

        if (!closest) return false;

        const dx = closest.x - this.x;
        const dy = closest.y - this.y;

        if (minDist < 150) {
          this.x += dx * 0.03;
          this.y += dy * 0.03;
        }

        if (minDist < closest.radius) {
          this.active = false;
          return true;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        return false;
      }

      draw() {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = 300;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    class FireText {
      text: string;
      baseSize: number;
      size: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      letters: { char: string; x: number; y: number; radius: number }[];
      exploding: boolean;
      explodeTimer: number;
      frameCounter: number;

      constructor(text: string) {
        this.text = text.toUpperCase().slice(0, 8);
        this.baseSize = 30;
        this.size = this.baseSize;
        this.x = w / 2;
        this.y = h / 2;
        this.dx = 1.5;
        this.dy = 1.2;
        this.letters = [];
        this.exploding = false;
        this.explodeTimer = 0;
        this.frameCounter = 0;
      }

      update(particlesList: Particle[]) {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 150 || this.x > w - 150) this.dx *= -1;
        if (this.y < 100 || this.y > h - 100) this.dy *= -1;

        this.updateLetters();

        let eatenThisFrame = 0;
        particlesList.forEach((p) => {
          if (p.update(this.letters)) eatenThisFrame++;
        });

        this.frameCounter++;
        const maxFrames = 60 * 30;
        if (this.frameCounter >= maxFrames && !this.exploding) {
          this.exploding = true;
          this.explodeTimer = 20;
        }

        if (!this.exploding) {
          const growthRatio = this.frameCounter / maxFrames;
          this.size = this.baseSize + growthRatio * 70 + eatenThisFrame * 0.3;
        }

        if (this.exploding) {
          this.size += 10;
          this.explodeTimer--;
          if (this.explodeTimer <= 0) {
            this.exploding = false;
            this.frameCounter = 0;
            this.size = this.baseSize;
            particlesList.forEach((p) => p.reset());
          }
        }
      }

      updateLetters() {
        this.letters = [];
        const totalWidth = this.text.length * this.size * 0.6;
        const startX = this.x - totalWidth / 2;
        for (let i = 0; i < this.text.length; i++) {
          this.letters.push({
            char: this.text[i],
            x: startX + i * this.size * 0.6,
            y: this.y,
            radius: this.size / 2,
          });
        }
      }

      draw() {
        this.letters.forEach((l) => {
          const grad = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, this.size);
          grad.addColorStop(0, "#fff");
          grad.addColorStop(0.3, "#ffec00");
          grad.addColorStop(0.6, "#ff3300");
          grad.addColorStop(1, "rgba(255,0,0,0.3)");
          ctx.fillStyle = grad;
          ctx.shadowColor = "#fff";
          ctx.shadowBlur = 15;
          ctx.font = `bold ${this.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(l.char, l.x, l.y);
        });
      }
    }

    let activeTexts: FireText[] = [new FireText("KENETH")];

    class Lightning {
      active: boolean;
      x: number;
      timer: number;

      constructor() {
        this.active = false;
        this.x = w / 2;
        this.timer = 0;
      }

      update() {
        if (!this.active && Math.random() < 0.03) {
          this.active = true;
          this.x = Math.random() * w;
          this.timer = 0;
        }
        if (this.active) this.timer++;
        if (this.timer > 8) this.active = false;
      }

      draw(textObjs: FireText[]) {
        if (!this.active) return;
        const startX = this.x;
        const startY = 0;
        const targetObj = textObjs[Math.floor(Math.random() * textObjs.length)];
        const endX = targetObj.x + (Math.random() * targetObj.size - targetObj.size / 2);
        const endY = targetObj.y + (Math.random() * targetObj.size - targetObj.size / 2);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        const segments = 20;
        for (let i = 1; i < segments; i++) {
          const px =
            startX + ((endX - startX) / segments) * i + (Math.random() - 0.5) * 20;
          const py =
            startY + ((endY - startY) / segments) * i + (Math.random() - 0.5) * 20;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 10;
        ctx.stroke();

        const dx = endX - targetObj.x;
        const dy = endY - targetObj.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < targetObj.size) {
          targetObj.size += 2;
        }
      }
    }

    const lightning = new Lightning();

    const input = inputRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!input) return;
      if (e.key === "Enter" && input.value.trim() !== "") {
        activeTexts.push(new FireText(input.value.trim()));
        input.value = "";
      }
    };

    if (input) {
      input.addEventListener("keydown", handleKeyDown);
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      activeTexts.forEach((t) => {
        t.update(particles);
        t.draw();
      });

      particles.forEach((p) => p.draw());

      lightning.update();
      lightning.draw(activeTexts);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (input) {
        input.removeEventListener("keydown", handleKeyDown);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f30] overflow-hidden">
      <Header />
      <main className="relative h-screen w-full">
        <input
          ref={inputRef}
          type="text"
          maxLength={8}
          placeholder="Type your text (max 8)ENTER"
          className="fixed top-24 left-1/2 -translate-x-1/2 z-20 text-sm md:text-base px-3 py-2 rounded-lg border-none outline-none bg-white text-black max-w-xs w-[260px]"
        />
        <canvas ref={canvasRef} className="block w-full h-full" />
      </main>
      <Footer />
    </div>
  );
};

export default JsNameAnimation;
