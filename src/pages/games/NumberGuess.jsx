import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./GuessNumber.css";
import api from "../../api.js";

const GuessNumber = () => {
  const [timeLeft, setTimeLeft] = useState(23 * 3600 + 30 * 60); // 23 hours, 30 minutes
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState(
    "Enter your number and press the submit button."
  );
  const [guessCount, setGuessCount] = useState(0);

  const getStoredData = () => {
    const lastGameTime = localStorage.getItem("lastGameTime");
    const storedGuessCount = localStorage.getItem("guessCount");
    const currentTime = new Date().getTime();

    if (lastGameTime && storedGuessCount) {
      const timeDiff = currentTime - lastGameTime;

      if (timeDiff < 24 * 60 * 60 * 1000) {
        setGuessCount(parseInt(storedGuessCount, 10));
      } else {
        localStorage.setItem("guessCount", "0");
        setGuessCount(0);
      }
    } else {
      localStorage.setItem("guessCount", "0");
      setGuessCount(0);
    }
  };

  useEffect(() => {
    getStoredData();

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
    let value = event.target.value.replace(/[^0-9]/g, "");

    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    if (value.includes("4")) {
      if ("vibrate" in navigator) navigator.vibrate([500, 200, 500]);
      value = "";
      setMessage("The digit 4 is not allowed! Please try again.");
    } else {
      setMessage("Enter your number and press the submit button.");
    }

    setInputValue(value);
  };

  const userId = 4; // hard coded the userId

  const submitGuess = async () => {
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
      return;
    }

    // const now = new Date();
    try {
      const response = await api.post("/GuessEachUsers/Add", {
        userId: userId,
        date: "string", // now.toISOString().split("T")[0];
        time: "string", // now.toTimeString().split(" ")[0];
        guessNumber: parseInt(inputValue, 10),
      });

      if (response.data.isSuccess) {
        setMessage("Your guess has been recorded successfully.");
        setGuessCount((prev) => {
          const newGuessCount = prev + 1;
          localStorage.setItem("guessCount", newGuessCount.toString());
          return newGuessCount;
        });
        setInputValue("");
      } else {
        setMessage("Failed to submit your guess. Try again.");
      }
    } catch (error) {
      console.error("Error submitting guess:", error);
      setMessage("High Request Or More than 10 guesses");
    }
  };

  const resetGame = async () => {
    try {
      // Fetch all guesses for user 4
      const response = await api.post("/GuessEachUsers/GetByUserId", {
        userId: userId,
      });

      if (!response.data || !response.data.guessEachUsers) {
        throw new Error("Failed to fetch user guesses");
      }

      const guessIds = response.data.guessEachUsers.map(
        (guess) => guess.guessEachUserId
      );

      await Promise.all(
        guessIds.map((guessEachUserId) =>
          api.delete("/GuessEachUsers/Delete", { data: { guessEachUserId } })
        )
      );

      localStorage.setItem("lastGameTime", new Date().getTime().toString());
      localStorage.setItem("guessCount", "0");

      setGuessCount(0);
      setMessage("Game reset. All guesses removed.");
    } catch (error) {
      console.error("Error resetting game:", error);
      setMessage("Failed to reset game.");
    }
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

      <h1 style={{ marginBottom: "10rem" }}>Number Guessing Game</h1>

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
