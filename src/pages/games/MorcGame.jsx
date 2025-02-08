import { useState, useEffect } from "react";
import "./MorseGame.css";

const MorseGame = () => {
  const [morseCode, setMorseCode] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [morseStartTime, setMorseStartTime] = useState(null);
  const [explosionVisible, setExplosionVisible] = useState(false);
  const [timerColorIndex, setTimerColorIndex] = useState(0);

  const morseMap = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
  };

  const colors = [
    "#FF5733", // Red
    "#FFC300", // Yellow
    "#DAF7A6", // Light green
    "#33FF57", // Green
    "#337BFF", // Blue
    "#FF33F6", // Pink
  ];

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up! The page is locked.");
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 10) {
      document.getElementById("timer").style.color = "rgba(255, 0, 0, 1)"; // Red color
      vibrate();
    }
    changeTimerColor();
  }, [timeLeft]);

  const vibrate = () => {
    const timer = document.getElementById("timer");
    timer.style.transform = "translate(0px, 5px)"; // Move down
    setTimeout(() => {
      timer.style.transform = "translate(0px, -5px)"; // Move up
    }, 100);
    setTimeout(() => {
      timer.style.transform = "translate(0px, 0px)"; // Reset position
    }, 200);
  };

  const changeTimerColor = () => {
    document.getElementById("timer").style.color = colors[timerColorIndex];
    setTimerColorIndex((timerColorIndex + 1) % colors.length); // Change index with loop
  };

  const startMorse = () => {
    setMorseStartTime(Date.now());
  };

  const endMorse = () => {
    let duration = Date.now() - morseStartTime;
    if (duration < 300) {
      setMorseCode((prev) => prev + ".");
    } else {
      setMorseCode((prev) => prev + "-");
    }
    updateMorseCodeDisplay();
    setTimeout(checkMorseCode, 2000);
  };

  const updateMorseCodeDisplay = () => {
    document.getElementById("morse-code").textContent = morseCode;
  };

  const checkMorseCode = () => {
    if (morseMap[morseCode]) {
      let letter = morseMap[morseCode];
      setDecodedMessage((prev) => prev + letter);
      setMorseCode("");
      showExplosion();
    } else {
      setMorseCode("");
      setDecodedMessage("");
      alert("Invalid Morse code. Sentences have been reset.");
    }
  };

  const showExplosion = () => {
    setExplosionVisible(true);
    setTimeout(() => setExplosionVisible(false), 1000);
  };

  return (
    <div className="morse-container">
      <div className="morse-header">
        <div id="timer" className="morse-timer">
          {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
            timeLeft % 60
          }`}
        </div>
      </div>

      <div id="decoded-message" className="decoded-message">
        Letter: {decodedMessage}
      </div>
      <div id="morse-code" className="morse-code">
        {morseCode}
      </div>

      <div
        className="morse-circle"
        onMouseDown={startMorse}
        onMouseUp={endMorse}
      >
        <img src="morse.png" alt="Telegraph" className="morse-circle-image" />
      </div>

      {explosionVisible && <div className="explosion-effect"></div>}
    </div>
  );
};

export default MorseGame;
