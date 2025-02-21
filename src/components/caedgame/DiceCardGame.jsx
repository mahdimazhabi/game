import { useState, useEffect } from "react";
import "./DiceCardGame.css";
import { div } from "framer-motion/client";

const DiceCardGame = () => {
  const [diceNumber, setDiceNumber] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [playerNumbers, setPlayerNumbers] = useState({});

  useEffect(() => {
    startGame();
  }, []);

  const findOnlineUsers = () => {
    return [
      { name: "کاربر آبی", color: "blue", numbers: new Set() },
      { name: "کاربر زرد", color: "yellow", numbers: new Set() },
    ];
  };

  const startGame = () => {
    const users = findOnlineUsers();
    setPlayers(users);
    setCurrentPlayerIndex(0);
    setPlayerNumbers({ "کاربر آبی": new Set(), "کاربر زرد": new Set() });
  };

  const rollDice = () => {
    if (playerNumbers[players[currentPlayerIndex].name]?.size >= 6) return;

    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);

    setTimeout(() => {
      const updatedNumbers = new Set(
        playerNumbers[players[currentPlayerIndex].name]
      );
      updatedNumbers.add(randomNumber);
      setPlayerNumbers((prev) => ({
        ...prev,
        [players[currentPlayerIndex].name]: updatedNumbers,
      }));

      if (updatedNumbers.size === 6) {
        alert(`${players[currentPlayerIndex].name} برنده شد!`);
      } else {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      }
    }, 1000);
  };

  return (
    <div>
      <div className="container15">
        <div className="cards left-cards">
          {[...Array(6)].map((_, index) => (
            <div
              className={`card ${
                playerNumbers[players[currentPlayerIndex]?.name]?.has(index + 1)
                  ? "flipped"
                  : ""
              }`}
              key={index}
              data-number={index + 1}
            >
              <img src={`/logo${index + 1}.png`} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="dice-container" onClick={rollDice}>
          <div className="dice" id="dice">
            {diceNumber !== null ? (
              <div className="face front">{diceNumber}</div>
            ) : (
              "Click to Roll"
            )}
          </div>
          <div id="dice-result">
            {diceNumber !== null && `Result: ${diceNumber}`}
          </div>
          <div
            id="turn-indicator"
            style={{ color: players[currentPlayerIndex]?.color }}
          >
            {players.length > 0 && `نوبت: ${players[currentPlayerIndex]?.name}`}
          </div>
        </div>

        {/* <div className="poster">
        <img src="/poster.jpg" alt="Poster" />
      </div> */}

        <div className="cards right-cards">
          {[...Array(6)].map((_, index) => (
            <div
              className={`card ${
                playerNumbers[players[currentPlayerIndex]?.name]?.has(index + 1)
                  ? "flipped"
                  : ""
              }`}
              key={index}
              data-number={index + 1}
            >
              <img src={`/logo${index + 1}.png`} alt={`Logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiceCardGame;
