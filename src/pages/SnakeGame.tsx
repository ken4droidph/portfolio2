import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SnakeGame = () => {
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scoreEl = document.getElementById("score");
    const controlsEl = document.getElementById("controls") as HTMLDivElement | null;
    const startBtn = document.getElementById("startBtn") as HTMLButtonElement | null;
    const addWallBtn = document.getElementById("addWallBtn") as HTMLButtonElement | null;
    const speedUpBtn = document.getElementById("speedUpBtn") as HTMLButtonElement | null;
    const speedDownBtn = document.getElementById("speedDownBtn") as HTMLButtonElement | null;
    const upBtn = document.getElementById("upBtn") as HTMLButtonElement | null;
    const downBtn = document.getElementById("downBtn") as HTMLButtonElement | null;
    const leftBtn = document.getElementById("leftBtn") as HTMLButtonElement | null;
    const rightBtn = document.getElementById("rightBtn") as HTMLButtonElement | null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Snake
    let snake: { x: number; y: number }[] = [];
    let snakeLength = 5;
    const snakeSpeed = 3;
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };

    // Food
    type Food = { x: number; y: number; eaten: boolean; color: string };
    let food: Food[] = [];
    const foodCount = 30;
    const foodRadius = 8;
    type BoostFood = { x: number; y: number; eaten: boolean; color: string; size: number; label: string };
    let boostFood: BoostFood | null = null;
    const boostRadius = 25;
    let foodsEaten = 0;

    // Game state
    let gameOver = false;
    let running = false;

    // AI Walls
    type AIEnemy = { x: number; y: number; vx: number; vy: number; visible: boolean };
    let aiEnemies: AIEnemy[] = [];
    const aiSize = 70;
    let aiSpeed = 1.5;

    // Mobile detection
    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Generate food
    function generateFood() {
      food = [];
      for (let i = 0; i < foodCount; i++) {
        food.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: Math.random() * (canvas.height - 40) + 20,
          eaten: false,
          color: `hsl(${Math.random() * 360},70%,60%)`,
        });
      }
    }

    // Generate boost
    function generateBoostFood() {
      boostFood = {
        x: Math.random() * (canvas.width - 60) + 30,
        y: Math.random() * (canvas.height - 60) + 30,
        eaten: false,
        color: `hsl(${Math.random() * 360},70%,50%)`,
        size: boostRadius,
        label: "x2",
      };
    }

    // Add AI wall
    function addAIWall() {
      aiEnemies.push({
        x: Math.random() * (canvas.width - aiSize),
        y: Math.random() * (canvas.height - aiSize),
        vx: (Math.random() < 0.5 ? 1 : -1) * aiSpeed,
        vy: (Math.random() < 0.5 ? 1 : -1) * aiSpeed,
        visible: true,
      });
    }

    let animationFrameId: number;

    // Game loop
    function gameLoop() {
      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        if (startBtn) startBtn.style.display = "block";
        return;
      }

      ctx.fillStyle = "#0f0f30";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      direction = nextDirection;
      const head = snake[snake.length - 1];
      const newHead = {
        x: head.x + direction.x * snakeSpeed,
        y: head.y + direction.y * snakeSpeed,
      };
      snake.push(newHead);
      if (snake.length > snakeLength) snake.shift();

      if (
        newHead.x < 5 ||
        newHead.x > canvas.width - 5 ||
        newHead.y < 5 ||
        newHead.y > canvas.height - 5
      ) {
        gameOver = true;
      }

      // Draw snake body
      for (let i = 0; i < snake.length - 1; i++) {
        ctx.fillStyle = `hsl(${i * 5},70%,60%)`;
        ctx.beginPath();
        ctx.arc(snake[i].x, snake[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw head
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(newHead.x, newHead.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Normal food
      food.forEach((f) => {
        if (!f.eaten) {
          ctx.fillStyle = f.color;
          ctx.beginPath();
          ctx.arc(f.x, f.y, foodRadius, 0, Math.PI * 2);
          ctx.fill();
          const dx = f.x - newHead.x;
          const dy = f.y - newHead.y;
          if (Math.sqrt(dx * dx + dy * dy) < 15) {
            f.eaten = true;
            snakeLength++;
            foodsEaten++;
            if (foodsEaten % 15 === 0 && boostFood === null) {
              generateBoostFood();
            }
          }
        }
      });

      // Respawn food
      food.forEach((f) => {
        if (f.eaten && Math.random() < 0.01) {
          f.eaten = false;
          f.x = Math.random() * (canvas.width - 40) + 20;
          f.y = Math.random() * (canvas.height - 40) + 20;
          f.color = `hsl(${Math.random() * 360},70%,60%)`;
        }
      });

      // Boost food
      if (boostFood && !boostFood.eaten) {
        ctx.fillStyle = boostFood.color;
        ctx.beginPath();
        ctx.arc(boostFood.x, boostFood.y, boostFood.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(boostFood.label, boostFood.x, boostFood.y);
        const dx = boostFood.x - newHead.x;
        const dy = boostFood.y - newHead.y;
        if (Math.sqrt(dx * dx + dy * dy) < boostFood.size + 10) {
          boostFood.eaten = true;
          snakeLength *= 2;
          boostFood = null;
        }
      }

      // AI walls (collision only with head)
      aiEnemies.forEach((ai) => {
        ai.x += ai.vx;
        ai.y += ai.vy;
        if (ai.x < 0 || ai.x + aiSize > canvas.width) ai.vx *= -1;
        if (ai.y < 0 || ai.y + aiSize > canvas.height) ai.vy *= -1;
        ctx.fillStyle = "#000";
        ctx.fillRect(ai.x, ai.y, aiSize, aiSize);

        if (
          newHead.x > ai.x &&
          newHead.x < ai.x + aiSize &&
          newHead.y > ai.y &&
          newHead.y < ai.y + aiSize
        ) {
          gameOver = true;
        }
      });

      if (scoreEl) {
        scoreEl.textContent = `Score: ${snakeLength - 5}`;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Reset game
    function resetGame() {
      if (controlsEl) controlsEl.style.display = "block";

      snakeLength = 5;
      snake = [];
      for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: canvas.width / 2 - i * 10, y: canvas.height / 2 });
      }
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      gameOver = false;
      foodsEaten = 0;
      generateFood();
      boostFood = null;
      aiEnemies = [];
      if (scoreEl) scoreEl.textContent = "Score: 0";
      running = true;
      if (startBtn) startBtn.style.display = "none";
      animationFrameId = requestAnimationFrame(gameLoop);
    }

    // Button events
    const handleStartClick = () => resetGame();
    startBtn?.addEventListener("click", handleStartClick);

    const handleAddWallClick = () => addAIWall();
    addWallBtn?.addEventListener("click", handleAddWallClick);

    const handleSpeedUpClick = () => {
      aiSpeed += 0.5;
      aiEnemies.forEach((ai) => {
        ai.vx = (ai.vx > 0 ? 1 : -1) * aiSpeed;
        ai.vy = (ai.vy > 0 ? 1 : -1) * aiSpeed;
      });
    };
    speedUpBtn?.addEventListener("click", handleSpeedUpClick);

    const handleSpeedDownClick = () => {
      aiSpeed = Math.max(0.5, aiSpeed - 0.5);
      aiEnemies.forEach((ai) => {
        ai.vx = (ai.vx > 0 ? 1 : -1) * aiSpeed;
        ai.vy = (ai.vy > 0 ? 1 : -1) * aiSpeed;
      });
    };
    speedDownBtn?.addEventListener("click", handleSpeedDownClick);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!running) return;
      switch (e.key) {
        case "ArrowUp":
          if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Button / mobile controls
    const handleUpInput = () => {
      if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
    };
    const handleDownInput = () => {
      if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
    };
    const handleLeftInput = () => {
      if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
    };
    const handleRightInput = () => {
      if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
    };

    // Use click for all devices, touchstart additionally on mobile
    upBtn?.addEventListener("click", handleUpInput);
    downBtn?.addEventListener("click", handleDownInput);
    leftBtn?.addEventListener("click", handleLeftInput);
    rightBtn?.addEventListener("click", handleRightInput);

    if (isMobile) {
      upBtn?.addEventListener("touchstart", handleUpInput);
      downBtn?.addEventListener("touchstart", handleDownInput);
      leftBtn?.addEventListener("touchstart", handleLeftInput);
      rightBtn?.addEventListener("touchstart", handleRightInput);
    }

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", handleKeyDown);
      startBtn?.removeEventListener("click", handleStartClick);
      addWallBtn?.removeEventListener("click", handleAddWallClick);
      speedUpBtn?.removeEventListener("click", handleSpeedUpClick);
      speedDownBtn?.removeEventListener("click", handleSpeedDownClick);
      // Remove button handlers
      upBtn?.removeEventListener("click", handleUpInput);
      downBtn?.removeEventListener("click", handleDownInput);
      leftBtn?.removeEventListener("click", handleLeftInput);
      rightBtn?.removeEventListener("click", handleRightInput);
      if (isMobile) {
        upBtn?.removeEventListener("touchstart", handleUpInput);
        downBtn?.removeEventListener("touchstart", handleDownInput);
        leftBtn?.removeEventListener("touchstart", handleLeftInput);
        rightBtn?.removeEventListener("touchstart", handleRightInput);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f30] overflow-hidden flex flex-col">
      <Header />
      <main className="relative flex-1 w-full pt-24">
        <div
          id="score"
          className="fixed top-24 left-4 z-10 text-white text-lg"
        >
          Score: 0
        </div>

        <div
          id="controls"
          className="fixed top-32 left-4 z-10 hidden space-x-2"
        >
          <button
            id="addWallBtn"
            className="px-3 py-2 rounded bg-teal-400 text-white text-sm"
          >
            Add Wall
          </button>
          <button
            id="speedUpBtn"
            className="px-3 py-2 rounded bg-teal-400 text-white text-sm"
          >
            AI Speed +
          </button>
          <button
            id="speedDownBtn"
            className="px-3 py-2 rounded bg-teal-400 text-white text-sm"
          >
            AI Speed -
          </button>
        </div>

        {/* Mobile arrows */}
        <div
          id="mobileControls"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center md:hidden"
        >
          <div className="flex justify-center">
            <button
              id="upBtn"
              className="w-14 h-14 m-1 rounded-full bg-teal-400 text-white text-2xl"
            >
              ↑
            </button>
          </div>
          <div className="flex justify-center">
            <button
              id="leftBtn"
              className="w-14 h-14 m-1 rounded-full bg-teal-400 text-white text-2xl"
            >
              ←
            </button>
            <button
              id="downBtn"
              className="w-14 h-14 m-1 rounded-full bg-teal-400 text-white text-2xl"
            >
              ↓
            </button>
            <button
              id="rightBtn"
              className="w-14 h-14 m-1 rounded-full bg-teal-400 text-white text-2xl"
            >
              →
            </button>
          </div>
        </div>

        <canvas
          id="gameCanvas"
          className="block w-full h-full border-4 border-white"
        />

        <button
          id="startBtn"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-xl bg-teal-400 text-white text-xl z-10"
        >
          START GAME
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default SnakeGame;
