import { useEffect, useState } from "react";
import "./GuessNumber.css";

const GuessNumber = () => {
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 30 * 60); // 23 ساعت و 30 دقیقه
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(
    "Enter your number and press the submit button."
  );
  const [guessCount, setGuessCount] = useState(0);

  useEffect(() => {
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
    if (!isValidInput(inputValue)) {
      if ("vibrate" in navigator) navigator.vibrate(200);
      setMessage(
        "Invalid input! Please enter a 7-digit number without the digit 4."
      );
      setInputValue("");
    } else {
      setMessage("Your guess has been recorded.");
      setGuessCount((prev) => prev + 1);
      setInputValue("");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <button
          onClick={() => (window.location.href = "/")}
          className="button-30"
        >
          {"<"}
        </button>
        <div className="button-30" id="timer">
          <span>{formatTime(timeLeft)}</span>
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
    </div>
  );
};

export default GuessNumber;
