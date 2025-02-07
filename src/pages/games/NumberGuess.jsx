import React, { useState, useEffect } from "react";
import "./GuessNumber.css";

const GuessNumber = () => {
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("یک عدد بین ۱ تا ۱۰۰ حدس بزن!");
  const [playerId, setPlayerId] = useState(1); // شناسه بازیکن

  useEffect(() => {
    // درخواست برای دریافت یک عدد تصادفی از API
    fetch("http://localhost:8000/api/game/")
      .then((response) => response.json())
      .then((data) => setTargetNumber(data.random_number))
      .catch((error) => console.error("Error fetching random number:", error));
  }, []);

  const checkGuess = () => {
    const numberGuess = parseInt(guess, 10);
    if (isNaN(numberGuess)) {
      setMessage("لطفاً یک عدد معتبر وارد کنید!");
      return;
    }

    // ارسال حدس به سرور
    fetch("http://localhost:8000/api/game/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player_id: playerId, guess: numberGuess }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes("win")) {
          setMessage("🎉 درست حدس زدی! دوباره امتحان کن!");
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting guess:", error);
      });

    setGuess("");
  };

  return (
    <div className="guess-container">
      <h1 className="guess-title">🎯 بازی حدس عدد</h1>
      <p className="guess-message">{message}</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="عدد را وارد کنید"
        className="guess-input"
      />
      <button onClick={checkGuess} className="guess-button">
        حدس بزن
      </button>
    </div>
  );
};

export default GuessNumber;
