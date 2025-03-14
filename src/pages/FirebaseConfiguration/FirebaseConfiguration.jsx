import { useState, useEffect } from "react";
import "./FirebaseConfiguration.css";

const FirebaseConfiguration = () => {
  const [currentPlayer, setCurrentPlayer] = useState("blue"); // نوبت کاربر اول
  const [gameCount, setGameCount] = useState(0); // شمارش بازی‌ها
  const [gameState, setGameState] = useState(Array(9).fill(null)); // وضعیت بازی
  const [blueCount, setBlueCount] = useState(0); // شمارش آبی‌ها
  const [redCount, setRedCount] = useState(0); // شمارش قرمزها
  const [status, setStatus] = useState("منتظر اتصال بازیکن دوم...");
  const [waitingForPlayer, setWaitingForPlayer] = useState(false); // وضعیت انتظار

  const handleCellClick = (index) => {
    if (waitingForPlayer || gameState[index] || gameCount >= 10) return; // بازیکن اول نمی‌تواند کلیک کند

    if (currentPlayer === "blue") {
      if (blueCount < 3) {
        const newGameState = [...gameState];
        newGameState[index] = "blue";
        setGameState(newGameState);
        setBlueCount(blueCount + 1);
        setWaitingForPlayer(true); // بعد از کلیک، منتظر بازیکن دوم می‌شود
        setStatus("منتظر آنلاین شدن بازیکن دوم...");
      } else {
        alert("شما نمی‌توانید بیشتر از ۳ خانه انتخاب کنید!");
      }
    }
  };

  useEffect(() => {
    // شبیه‌سازی ورود بازیکن دوم (برای تست، بعد از 3 ثانیه)
    const timer = setTimeout(() => {
      setWaitingForPlayer(false);
      setStatus("نوبت بازیکن دوم است.");
      setCurrentPlayer("red");
    }, 3000);

    return () => clearTimeout(timer);
  }, [waitingForPlayer]);

  return (
    <div>
      <h1>بازی آنلاین دوز</h1>
      <div id="status">{status}</div>
      <div id="game-board">
        {gameState.map((cell, index) => (
          <div
            key={index}
            className={`cell ${
              cell === "blue" ? "blue" : cell === "red" ? "red" : ""
            }`}
            onClick={() => handleCellClick(index)}
          >
            {cell === "blue" ? "O" : cell === "red" ? "X" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirebaseConfiguration;
