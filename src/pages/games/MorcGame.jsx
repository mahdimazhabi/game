import "./Mors.css";

const MorcGame = () => {
  function goBack() {
    window.history.back(); // بازگشت به صفحه قبلی
  }

  let morseCode = "";
  let decodedMessage = "";
  let morseStartTime;
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
  function startMorse() {
    morseStartTime = Date.now();
  }
  function endMorse() {
    let duration = Date.now() - morseStartTime;
    if (duration < 300) {
      morseCode += ".";
    } else {
      morseCode += "-";
    }
    updateMorseCodeDisplay();
    clearTimeout(checkMorseTimeout);
    checkMorseTimeout = setTimeout(checkMorseCode, 2000);
  }
  function updateMorseCodeDisplay() {
    document.getElementById("morse-code").textContent = "" + morseCode;
  }
  function checkMorseCode() {
    if (morseMap[morseCode]) {
      let letter = morseMap[morseCode];
      decodedMessage += letter;
      morseCode = "";
      document.getElementById("decoded-message").textContent = decodedMessage;
      showExplosion();
    } else {
      morseCode = "";
      decodedMessage = "";
      document.getElementById("decoded-message").textContent = "";
      document.getElementById("morse-code").textContent = "";
      alert("کد مورس اشتباه است. جملات ریست شدند.");
    }
  }
  let checkMorseTimeout;
  let timeLeft = 1200; // 20 دقیقه به ثانیه
  let colors = [
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#33FF57",
    "#337BFF",
    "#FF33F6",
  ];
  let currentColorIndex = 0;
  let timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer1").textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    // در ده ثانیه پایانی
    if (timeLeft <= 10) {
      document.getElementById("timer1").style.color = "rgba(255, 0, 0, 1)"; // رنگ قرمز
      if (timeLeft % 2 === 0) {
        vibrate(); // ویبره
      }
    }

    // تغییر رنگ
    changeTimerColor();
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      alert("زمان شما به پایان رسید! صفحه قفل شد.");
      clearInterval();
    }
  }

  function changeTimerColor() {
    // تغییر رنگ شمارش‌گر
    const timer = document.getElementById("timer1");
    timer.style.color = colors[currentColorIndex];
    currentColorIndex = (currentColorIndex + 1) % colors.length; // تغییر ایندکس با حلقه
  }

  function vibrate() {
    const timer = document.getElementById("timer1");
    timer.style.transform = "translate(0px, 5px)"; // حرکت پایین
    setTimeout(() => {
      timer.style.transform = "translate(0px, -5px)"; // حرکت بالا
    }, 100);
    setTimeout(() => {
      timer.style.transform = "translate(0px, 0px)"; // ریست کردن وضعیت
    }, 200);
  }

  function showExplosion() {
    const explosion = document.getElementById("explosion");
    explosion.style.display = "block";
    explosion.style.animation = "explosion-animation 1s forwards";
    explosion.offsetHeight; // Trigger reflow to restart animation
    const container = document.querySelector(".container1");
    container.style.animation = "shake 0.5s forwards"; // اضافه کردن ویبره به کانتینر
    // مخفی کردن انفجار بعد از پخش انیمیشن
    setTimeout(() => {
      explosion.style.display = "none";
      container.style.animation = ""; // ریست انیمیشن
    }, 1000);
  }

  return (
    <div className="container1">
      <button className="back-button1" onClick={goBack}>
        &lt;
      </button>
      <div className="header1">
        <div id="timer1" className="timer1">
          20:00
        </div>
      </div>
      <br />
      <br />
      <br />
      <div id="decoded-message" className="button-30" role="button"></div>
      <div id="morse-code" className="morse-code"></div>
      <div
        className="circle1"
        id="telegraph-button"
        onMouseDown={startMorse}
        onMouseUp={endMorse}
      >
        <img src="/newImages/morse_logo.png" alt="image" />
      </div>
      <div className="explosion" id="explosion"></div>
      <div className="tab-container"></div>
    </div>
  );
};

export default MorcGame;
