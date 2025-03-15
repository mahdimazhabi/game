import { useEffect, useRef, useState } from "react";
import "./DiceGame.css";

const DiceGame = () => {
	const rollDiceButtonRef = useRef(null);
	const blueTokenRef = useRef(null);
	const yellowTokenRef = useRef(null);
	const diceRef = useRef(null);
	const resultTextRef = useRef(null);
	const currentTurnRef = useRef(null);

	const [bluePlayerIndex, setBluePlayerIndex] = useState(0);
	const [yellowPlayerIndex, setYellowPlayerIndex] = useState(0);
	const [isBlueTurn, setIsBlueTurn] = useState(true);
	const [diceRoll, setDiceRoll] = useState(1); // Added state for dice roll

	useEffect(() => {
		const rollDiceButton = rollDiceButtonRef.current;
		const blueToken = blueTokenRef.current;
		const yellowToken = yellowTokenRef.current;
		const dice = diceRef.current;
		const resultText = resultTextRef.current;
		const currentTurn = currentTurnRef.current;

		const bluePositions = document.querySelectorAll(
			".blue-side .position",
		);
		const yellowPositions = document.querySelectorAll(
			".yellow-side .position",
		);

		function rollDice() {
			rollDiceButton.disabled = true;
			resultText.textContent = "Rolling the dice...";

			const newDiceRoll = Math.floor(Math.random() * 6) + 1;
			setDiceRoll(newDiceRoll); // Update the dice roll state
			const diceColor = getRandomColor();

			animateDice(newDiceRoll, diceColor);

			setTimeout(() => {
				handleDiceResult(newDiceRoll, diceColor);
				rollDiceButton.disabled = false;
				checkWin();
				switchTurn();
			}, 1500);
		}

		function getRandomColor() {
			const colors = ["Blue", "Yellow", "Red"];
			return colors[Math.floor(Math.random() * colors.length)];
		}

		function animateDice(diceRoll, diceColor) {
			dice.style.transform = `rotateX(${
				Math.random() * 360
			}deg) rotateY(${Math.random() * 360}deg)`;
			dice.style.backgroundColor = getColorCode(diceColor);
			setTimeout(() => {
				dice.style.transform = `rotateX(0) rotateY(0)`;
				dice.setAttribute("data-face", diceRoll);
			}, 1000);
		}

		function getColorCode(color) {
			switch (color) {
				case "Blue":
					return "blue";
				case "Yellow":
					return "yellow";
				case "Red":
					return "red";
				default:
					return "white";
			}
		}

		function handleDiceResult(diceRoll, diceColor) {
			if (diceColor === "Blue") {
				moveToken(blueToken, bluePlayerIndex + 1, bluePositions);
				setBluePlayerIndex((prev) => prev + 1);
			} else if (diceColor === "Yellow") {
				moveToken(yellowToken, yellowPlayerIndex + 1, yellowPositions);
				setYellowPlayerIndex((prev) => prev + 1);
			} else if (diceColor === "Red") {
				moveToken(blueToken, bluePlayerIndex - 1, bluePositions);
				moveToken(yellowToken, yellowPlayerIndex - 1, yellowPositions);
				setBluePlayerIndex((prev) => Math.max(0, prev - 1));
				setYellowPlayerIndex((prev) => Math.max(0, prev - 1));
			}

			resultText.textContent = `Dice: ${diceRoll} (${diceColor})`;
		}

		function moveToken(token, newIndex, positions) {
			if (newIndex >= 0 && newIndex < positions.length) {
				const newPosition = positions[newIndex];
				const rect = newPosition.getBoundingClientRect();
				const parentRect =
					newPosition.parentElement.getBoundingClientRect();

				const top = rect.top - parentRect.top + rect.height / 2;
				const left = rect.left - parentRect.left + rect.width / 2;

				token.style.top = `${top}px`;
				token.style.left = `${left}px`;
			}
		}

		function checkWin() {
			if (bluePlayerIndex === bluePositions.length - 1) {
				resultText.textContent = "Blue player wins!";
				endGame();
			} else if (yellowPlayerIndex === yellowPositions.length - 1) {
				resultText.textContent = "Yellow player wins!";
				endGame();
			}
		}

		function switchTurn() {
			setIsBlueTurn((prev) => !prev);
			currentTurn.textContent = isBlueTurn ? "Blue" : "Yellow";
		}

		function endGame() {
			rollDiceButton.disabled = true;
		}

		rollDiceButton.addEventListener("click", rollDice);

		return () => {
			rollDiceButton.removeEventListener("click", rollDice);
		};
	}, [bluePlayerIndex, yellowPlayerIndex, isBlueTurn, diceRoll]); // Add diceRoll to the dependency array

	return (
		<div className="container">
			<button
				className="back-button"
				onClick={() => window.history.back()}>
				&gt;
			</button>
			<h1>Dice Game</h1>
			<div className="board">
				<div className="side blue-side">
					<div className="positions">
						<div className="position">House 1</div>
						<div className="position">House 2</div>
						<div className="position">House 3</div>
						<div className="position">House 4</div>
						<div className="position">House 5</div>
						<div className="position">House 6</div>
					</div>
					<div
						ref={blueTokenRef}
						className="token blue-token"></div>
				</div>
				<div className="side yellow-side">
					<div className="positions">
						<div className="position">House 1</div>
						<div className="position">House 2</div>
						<div className="position">House 3</div>
						<div className="position">House 4</div>
						<div className="position">House 5</div>
						<div className="position">House 6</div>
					</div>
					<div
						ref={yellowTokenRef}
						className="token yellow-token"></div>
				</div>
			</div>
			<div className="dice-container">
				<div
					ref={diceRef}
					className="dice">
					<div className="face">•</div>
				</div>
			</div>
			<div id="turn">
				Turn: <span ref={currentTurnRef}>Blue</span>
			</div>
			<p
				ref={resultTextRef}
				id="result"></p>
			<button
				ref={rollDiceButtonRef}
				id="roll-dice">
				Roll Dice
			</button>
		</div>
	);
};

export default DiceGame;
