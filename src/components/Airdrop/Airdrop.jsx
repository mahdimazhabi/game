import { useState, useEffect } from "react";
import img from "../../assets/img/photo_2025-02-06_11-36-07.jpg";
import "./Airdrop.css";

const Airdrop = () => {
  const [score, setScore] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          alert("زمان ایردراپ تمام شده است!");
          return 0;
        }
        return prevTime - 1;
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
      setScore((prevScore) => prevScore + 1);
      setClickCount((prevClickCount) => prevClickCount + 1);

      const circle = document.getElementById("clickableCircle");
      circle.classList.add("shake");
      navigator.vibrate(100);
      setTimeout(() => circle.classList.remove("shake"), 200);

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
        <div className="timer" id="timer">
          {formatTime(timeLeft)}
        </div>
        <h1>ایردراپ</h1>
        <div className="circle" id="clickableCircle" onClick={handleClick}>
          <img src={img} alt="Logo" className="logo" />
        </div>
        <span className="score" id="score">
          امتیاز: {score}
        </span>
      </div>
      <div id="gemContainer"></div>
    </section>
  );
};

export default Airdrop;
