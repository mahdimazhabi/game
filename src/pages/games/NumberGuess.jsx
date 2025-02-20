import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./GuessNumber.css";

const GuessNumber = () => {
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 30 * 60); // 23 ساعت و 30 دقیقه
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(
    "Enter your number and press the submit button."
  );
  const [guessCount, setGuessCount] = useState(0);

  // این تابع برای دریافت داده‌های ذخیره‌شده از localStorage است
  const getStoredData = () => {
    const lastGameTime = localStorage.getItem("lastGameTime");
    const storedGuessCount = localStorage.getItem("guessCount");
    const currentTime = new Date().getTime();

    if (lastGameTime && storedGuessCount) {
      // اگر زمان و تعداد تلاش‌ها در localStorage موجود است
      const timeDiff = currentTime - lastGameTime; // تفاوت زمانی بین حالا و زمان آخرین بازی

      if (timeDiff < 24 * 60 * 60 * 1000) {
        // اگر زمان کمتر از 24 ساعت باشد، تعداد تلاش‌ها را بارگذاری کن
        setGuessCount(parseInt(storedGuessCount));
      } else {
        // اگر 24 ساعت گذشته باشد، تعداد تلاش‌ها را به صفر تنظیم کن
        localStorage.setItem("guessCount", "0");
        setGuessCount(0);
      }
    } else {
      // اگر هیچ داده‌ای در localStorage موجود نبود، تعداد تلاش‌ها را صفر کن
      localStorage.setItem("guessCount", "0");
      setGuessCount(0);
    }
  };

  useEffect(() => {
    getStoredData(); // در شروع کامپوننت، داده‌ها را بارگذاری می‌کنیم

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const isValidInput = (input) =>
    /^[0-9]{7}$/.test(input) && !input.includes("4");

  const handleInputChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ""); // فقط اعداد مجاز باشند

    if (value.includes("4")) {
      if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
      value = "";
      setMessage("The digit 4 is not allowed! Please try again.");
    } else {
      setMessage("Enter your number and press the submit button.");
    }

    setInputValue(value);
  };

  const submitGuess = () => {
    if (guessCount >= 10) {
      setMessage("You have reached the maximum number of guesses for today.");
      return;
    }

    if (!isValidInput(inputValue)) {
      if ("vibrate" in navigator) navigator.vibrate(200);
      setMessage(
        "Invalid input! Please enter a 7-digit number without the digit 4."
      );
      setInputValue("");
    } else {
      setMessage("Your guess has been recorded.");
      setGuessCount((prev) => {
        const newGuessCount = prev + 1;
        localStorage.setItem("guessCount", newGuessCount.toString());
        return newGuessCount;
      });
      setInputValue("");
    }
  };

  const resetGame = () => {
    localStorage.setItem("lastGameTime", new Date().getTime().toString());
    localStorage.setItem("guessCount", "0");
    setGuessCount(0);
    setMessage("Game reset. You can guess again.");
  };

  return (
    <div className="container">
      <div>
        <button
          className="back-button1"
          onClick={() => (window.location.href = "/")}
        >
          <IoMdClose />
        </button>

        <div className="header1">
          <div id="timer1" className="timer1">
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <h1>Number Guessing Game</h1>

      <div id="number-display">Entered Number: {inputValue}</div>

      <input
        type="text"
        placeholder="Enter a 7-digit number without the digit 4"
        maxLength={7}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={submitGuess}>Submit</button>
      <p id="message">{message}</p>
      <p id="guessCounter">Guess Count: {guessCount}</p>
      {guessCount >= 10 && (
        <button onClick={resetGame}>Reset Game (24 hours)</button>
      )}
    </div>
  );
};

export default GuessNumber;
