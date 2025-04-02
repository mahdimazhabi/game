import {useState, useEffect} from "react";
import "./DiceCardGame.css";

const DiceCardGame = () => {
    const [diceNumber, setDiceNumber] = useState(null);
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [playerNumbers, setPlayerNumbers] = useState({
        "کاربر آبی": new Set(),
        "کاربر زرد": new Set(),
    });

    // 🔥 فقط یک طرف بچرخد (تنها این مقدار را تغییر دهید)
    const flipSide = "left"; // تغییر به "right" برای چرخش سمت راست

    useEffect(() => {
        startGame();
    }, []);

    const findOnlineUsers = () => {
        return [
            {name: "کاربر آبی", color: "blue"},
            {name: "کاربر زرد", color: "yellow"},
        ];
    };

    const startGame = () => {
        const users = findOnlineUsers();
        setPlayers(users);
        setCurrentPlayerIndex(0);
        setPlayerNumbers({
            "کاربر آبی": new Set(),
            "کاربر زرد": new Set(),
        });
    };

    const rollDice = () => {
        if (playerNumbers[players[currentPlayerIndex].name]?.size >= 6) return;

        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomNumber);

        setTimeout(() => {
            setPlayerNumbers((prev) => {
                const updatedNumbers = new Set(prev[players[currentPlayerIndex].name]);
                updatedNumbers.add(randomNumber);

                return {
                    ...prev,
                    [players[currentPlayerIndex].name]: updatedNumbers,
                };
            });

            if (playerNumbers[players[currentPlayerIndex].name]?.size === 6) {
                alert(`${players[currentPlayerIndex].name} برنده شد!`);
            } else {
                setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
            }
        }, 1000);
    };

    return (
        <div>
            <button
                style={{
                    userSelect: "none",
                }}
                className="back-button"
                onClick={() => window.history.back()}>
                {'<'}
            </button>
            <div className="container15">
                {/* کارت‌های سمت چپ */}
                <div className="cards left-cards">
                    {[...Array(6)].map((_, index) => (
                        <div
                            className={`card ${
                                flipSide === "left" && diceNumber === index + 1 ? "flipped" : ""
                            }`}
                            key={index}
                            data-number={index + 1}
                        >
                            <img src={`/logo${index + 1}.png`} alt={`Logo ${index + 1}`}/>
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
                        style={{color: players[currentPlayerIndex]?.color}}
                    >
                        {players.length > 0 && `نوبت: ${players[currentPlayerIndex]?.name}`}
                    </div>
                </div>

                {/* کارت‌های سمت راست */}
                <div className="cards right-cards">
                    {[...Array(6)].map((_, index) => (
                        <div
                            className={`card ${
                                flipSide === "right" && diceNumber === index + 1
                                    ? "flipped"
                                    : ""
                            }`}
                            key={index}
                            data-number={index + 1}
                        >
                            <img src={`/logo${index + 1}.png`} alt={`Logo ${index + 1}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DiceCardGame;
