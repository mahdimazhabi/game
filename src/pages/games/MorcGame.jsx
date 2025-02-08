import { useState, useEffect } from "react";
import "./Mors.css";

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

const MorcGame = () => {
  const [morseCode, setMorseCode] = useState("");
  const [decodedMessage, setDecodedMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isVibrating, setIsVibrating] = useState(false);
  const colors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#33FF57",
    "#337BFF",
    "#FF33F6",
  ];

  let morseStartTime = null;
  let checkMorseTimeout = null;

  useEffect(() => {
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, [timeLeft]);

  const startMorse = () => {
    morseStartTime = Date.now();
  };

  const endMorse = () => {
    const duration = Date.now() - morseStartTime;
    if (duration < 300) {
      setMorseCode((prevCode) => prevCode + ".");
    } else {
      setMorseCode((prevCode) => prevCode + "-");
    }
    clearTimeout(checkMorseTimeout);
    checkMorseTimeout = setTimeout(checkMorseCode, 2000);
  };

  const updateMorseCodeDisplay = () => {
    document.getElementById("morse-code").textContent = morseCode;
  };

  const checkMorseCode = () => {
    if (morseMap[morseCode]) {
      const letter = morseMap[morseCode];
      setDecodedMessage((prevMessage) => prevMessage + letter);
      setMorseCode("");
      document.getElementById("decoded-message").textContent =
        "Letter: " + decodedMessage;
      showExplosion();
    } else {
      setMorseCode("");
      setDecodedMessage("");
      document.getElementById("decoded-message").textContent = "Letter: ";
      document.getElementById("morse-code").textContent = "";
      alert("Invalid Morse code. Sentences have been reset.");
    }
  };

  const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer1").textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft <= 10) {
      document.getElementById("timer1").style.color = "rgba(255, 0, 0, 1)"; // Red color
      if (timeLeft % 2 === 0) {
        vibrate(); // Vibrate
      }
    }

    changeTimerColor();
    setTimeLeft((prevTime) => prevTime - 1);

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alert("Time's up! The page is locked.");
    }
  };

  const changeTimerColor = () => {
    const timer = document.getElementById("timer1");
    timer.style.color = colors[currentColorIndex];
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  const vibrate = () => {
    setIsVibrating(true);
    setTimeout(() => {
      setIsVibrating(false);
    }, 200);
  };

  const showExplosion = () => {
    const explosion = document.getElementById("explosion");
    explosion.style.display = "block";
    explosion.style.animation = "explosion-animation 1s forwards";
    explosion.offsetHeight; // Trigger reflow to restart animation
    const container = document.querySelector(".container1");
    container.style.animation = "shake 0.5s forwards"; // Add shake to container

    setTimeout(() => {
      explosion.style.display = "none";
      container.style.animation = ""; // Reset animation
    }, 1000);
  };

  return (
    <div className="container1">
      <div className="header1">
        <div id="timer1" className="timer1">
          {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
            timeLeft % 60
          }`}
        </div>
      </div>

      <div id="decoded-message" className="button-30" role="button">
        Letter: {decodedMessage}
      </div>
      <div id="morse-code" className="morse-code">
        {morseCode}
      </div>

      <div
        className="circle1"
        id="telegraph-button"
        onMouseDown={startMorse}
        onMouseUp={endMorse}
      >
        {/* <img src="morse.png" alt="image" /> */}
      </div>

      <div className="explosion" id="explosion"></div>

      <div className="tab-container"></div>
    </div>
  );
};

export default MorcGame;
