import { useState, useEffect } from "react";
import img from "../../assets/img/IMG_20250208_182414_366-removebg-preview.png";
import "./Airdrop.css";
const TOTAL_TIME = 120 * 60; // 2 ساعت به ثانیه
import useAirDropApi from "../../api/AirDropApi/useAirDropApi";

const Airdrop = () => {
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const { edit } = useAirDropApi();

  useEffect(() => {
    edit(clickCount);
  }, [clickCount, edit]);

  useEffect(() => {
    // دریافت زمان شروع از localStorage
    const savedStartTime = localStorage.getItem("airdropStartTime");
    const savedTimeLeft = localStorage.getItem("airdropTimeLeft");

    if (savedStartTime && savedTimeLeft) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedStartTime)) / 1000
      );
      const newTimeLeft = Math.max(parseInt(savedTimeLeft) - elapsedTime, 0);
      setTimeLeft(newTimeLeft);
    } else {
      // مقدار اولیه را تنظیم و در localStorage ذخیره می‌کنیم
      localStorage.setItem("airdropStartTime", Date.now().toString());
      localStorage.setItem("airdropTimeLeft", TOTAL_TIME.toString());
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          alert("زمان ایردراپ تمام شده است!");
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem("airdropTimeLeft", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const handleClick = () => {
    if (timeLeft > 0) {
      setClickCount((prevClickCount) => prevClickCount + 1);
      const circle = document.getElementById("clickableCircle");
      circle?.classList.add("shake");
      navigator.vibrate(100);
      setTimeout(() => circle?.classList.remove("shake"), 200);

      if ((clickCount + 1) % 5 === 0) {
        createGem();
      }
    } else {
      alert("زمان ایردراپ تمام شده است!");
    }
  };

  const createGem = () => {
    const gem = document.createElement("div");
    gem.classList.add("gem");
    gem.innerText = "💎";

    const circle = document.getElementById("clickableCircle");
    if (!circle) return;

    const circleRect = circle.getBoundingClientRect();
    const x = Math.random() * (circleRect.width - 100) + circleRect.left;
    const y = Math.random() * (circleRect.height - 100) + circleRect.top;

    gem.style.position = "absolute";
    gem.style.left = `${x}px`;
    gem.style.top = `${y}px`;
    document.body.appendChild(gem);

    setTimeout(() => {
      gem.remove();
    }, 500);
  };

  return (
    <section>
      <div className="container">
        <div className="timer">{formatTime(timeLeft)}</div>
        <h1>ایردراپ</h1>
        <div className="circle" id="clickableCircle" onClick={handleClick}>
          <img src={img} alt="Logo" className="logo" />
        </div>
      </div>
    </section>
  );
};

export default Airdrop;
