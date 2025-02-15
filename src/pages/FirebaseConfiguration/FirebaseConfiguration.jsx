// import { useState } from "react";
import "./FirebaseConfiguration.css";
import { useState, useEffect } from "react";

const FirebaseConfiguration = () => {
  const [currentPlayer, setCurrentPlayer] = useState("blue"); // نوبت کاربر اول
  const [gameCount, setGameCount] = useState(0); // شمارش بازی‌های انجام شده
  const [gameState, setGameState] = useState(Array(9).fill(null)); // وضعیت بازی
  const [blueCount, setBlueCount] = useState(0); // شمارش انتخاب‌های آبی
  const [redCount, setRedCount] = useState(0); // شمارش انتخاب‌های قرمز
  const [status, setStatus] = useState("Waiting for connection..."); // وضعیت بازی
  const maxGames = 10; // حداکثر تعداد بازی‌های روزانه

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2], // سطر اول
      [3, 4, 5], // سطر دوم
      [6, 7, 8], // سطر سوم
      [0, 3, 6], // ستون اول
      [1, 4, 7], // ستون دوم
      [2, 5, 8], // ستون سوم
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return true; // برنده پیدا شد
      }
    }
    return false; // برنده‌ای وجود ندارد
  };

  const triggerExplosion = () => {
    // قفل کردن انفجار
    const explosionDiv = document.createElement("div");
    explosionDiv.classList.add("explosion");
    document.body.appendChild(explosionDiv);

    // حذف انفجار بعد از زمان مشخص
    setTimeout(() => explosionDiv.remove(), 500);
  };

  const showBubbleExplosion = () => {
    // نمایش افکت حباب انفجاری
    const bubbleDiv = document.createElement("div");
    bubbleDiv.classList.add("explosion-bubble");
    bubbleDiv.style.top = `calc(50% - 100px)`; // تنظیم محل برای نمایش در وسط صفحه
    bubbleDiv.style.left = `calc(50% - 100px)`; // تنظیم محل برای نمایش در وسط صفحه
    document.body.appendChild(bubbleDiv);

    // حذف حباب بعد از زمان مشخص
    setTimeout(() => bubbleDiv.remove(), 1000);
  };

  const resetGame = () => {
    setGameState(Array(9).fill(null)); // پاک کردن وضعیت بازی
    setBlueCount(0); // ریست شمارش رنگ‌های آبی
    setRedCount(0); // ریست شمارش رنگ‌های قرمز
    setCurrentPlayer("blue"); // بازگشت به نوبت بازیکن اول
    setStatus("بازی دوباره شروع شد! نوبت بازیکن اول است."); // بازخورد وضعیت بازی

    // بررسی تعداد بازی انجام شده
    if (gameCount >= maxGames) {
      alert(
        "شما بازی‌های مجاز خود را تمام کرده‌اید. لطفاً فردا دوباره امتحان کنید."
      );
    }
  };

  useEffect(() => {
    if (checkWinner()) {
      const winner = currentPlayer === "blue" ? "بازیکن اول" : "بازیکن دوم";
      setStatus(`${winner} برنده شد!`);
      triggerExplosion(); // افکت انفجار وقتی برنده شود

      if (navigator.vibrate) {
        navigator.vibrate(200); // ویبره 200 میلی‌ثانیه
      }

      showBubbleExplosion(); // نمایش حباب انفجاری
      alert(`${winner} برنده شد! شما ۱۰ بار می‌توانید بازی کنید.`);
      setGameCount(gameCount + 1); // افزایش شمارش بازی
      resetGame(); // بازی را ریست کن
    } else if (gameState.every((cell) => cell !== null)) {
      setStatus("بازی مساوی شد!");
      if (navigator.vibrate) {
        navigator.vibrate(200); // ویبره 200 میلی‌ثانیه
      }

      showBubbleExplosion(); // نمایش حباب انفجاری
      alert("بازی مساوی شد! شما ۱۰ بار می‌توانید بازی کنید.");
      setGameCount(gameCount + 1); // افزایش شمارش بازی
      resetGame(); // بازی را ریست کن
    }
  }, [gameState, currentPlayer, gameCount]);

  const handleCellClick = (index) => {
    if (checkWinner() || gameCount >= maxGames) return; // اگر برنده‌ای وجود دارد یا تعداد بازی‌ها به حد مجاز رسیده

    if (gameState[index]) return; // اگر خانه پر است، هیچ کاری نکن

    if (currentPlayer === "blue") {
      if (blueCount < 3) {
        const newGameState = [...gameState];
        newGameState[index] = "blue";
        setGameState(newGameState);
        setBlueCount(blueCount + 1); // افزایش شمارش انتخاب آبی
      } else {
        alert(
          "شما نمی‌توانید بیشتر از 3 رنگ آبی انتخاب کنید. برای حذف یک رنگ قبلی، روی آن دو بار کلیک کنید."
        );
        return;
      }
    } else {
      if (redCount < 3) {
        const newGameState = [...gameState];
        newGameState[index] = "red";
        setGameState(newGameState);
        setRedCount(redCount + 1); // افزایش شمارش انتخاب قرمز
      } else {
        alert(
          "شما نمی‌توانید بیشتر از 3 رنگ قرمز انتخاب کنید. برای حذف یک رنگ قبلی، روی آن دو بار کلیک کنید."
        );
        return;
      }
    }

    setTimeout(() => {
      // افکت نور RGB
      const cell = document.querySelector(`[data-id="${index}"]`);
      cell.style.animation = "rgb-flash 0.5s forwards"; // اضافه کردن انیمیشن RGB
      setTimeout(() => (cell.style.animation = ""), 500); // ریست انیمیشن
    }, 0);

    // تغییر نوبت بازیکن
    setCurrentPlayer(currentPlayer === "blue" ? "red" : "blue");
    setStatus(`نوبت بازیکن ${currentPlayer === "blue" ? "اول" : "دوم"} است`);
  };

  const handleCellDoubleClick = (index) => {
    // ایجاد listener برای دبل کلیک
    console.log(index);
    if (gameState[index] && gameState[index] === currentPlayer) {
      const newGameState = [...gameState];

      newGameState[index] = null; // وضعیت آن خانه را پاک کنیم
      setGameState(newGameState);

      if (currentPlayer === "blue") {
        setBlueCount(blueCount - 1); // کاهش شمارش انتخاب آبی
      } else {
        setRedCount(redCount - 1); // کاهش شمارش انتخاب قرمز
      }

      setStatus(
        `شما یک رنگ را حذف کردید. نوبت بازیکن ${
          currentPlayer === "blue" ? "دوم" : "اول"
        } است.`
      );
    }
  };

  return (
    <div>
      <button
        className="back-button"
        onClick={() => window.history.back()}
      ></button>
      <h1>Online Tic Tac Toe Game</h1>
      <div id="status">{status}</div>
      <div id="game-board">
        {gameState.map((cell, index) => (
          <div
            key={index}
            data-id={index}
            className={`cell ${
              cell === "blue" ? "blue" : cell === "red" ? "red" : ""
            }`}
            onClick={() => handleCellClick(index)}
            onDoubleClick={() => handleCellDoubleClick(index)}
          >
            {cell === "blue" ? "O" : cell === "red" ? "X" : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirebaseConfiguration;
