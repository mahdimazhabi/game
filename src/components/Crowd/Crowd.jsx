import { useEffect, useState } from "react";
import "./Crowd.css";
import useCorsHorseApi from "../../api/CorsHorsApi";

const Crowd = () => {
	const [currentOption, setCurrentOption] = useState(null);
	const [selectedHorses, setSelectedHorses] = useState({});
	const [horses, setHorses] = useState([]);
	const { getAllCorsHorses } = useCorsHorseApi();

	useEffect(() => {
		(async () => {
			const horses = await getAllCorsHorses();
			setHorses(horses);
		})();
	}, [getAllCorsHorses]);

	const selectOption = (option) => {
		setCurrentOption(option);
		resetSelection();
		applyOptionRules(option);
	};

	const applyOptionRules = (option) => {
		const horseCells = document.querySelectorAll(".horse-cell");
		horseCells.forEach((cell) => cell.classList.remove("locked"));

		if (option === "fourByFour") {
			[6, 7, 8].forEach((round) => lockRound(round));
			for (let i = 1; i <= 5; i++) {
				for (let j = 5; j <= 8; j++) {
					lockHorse(i, j);
				}
			}
		}
	};

	const toggleSelection = (cell, round, horseId) => {
		if (cell.classList.contains("locked")) return;

		if (currentOption === "firstSecond" && countSelections(round) >= 2) {
			alert("You can only select two horses.");
			return;
		}

		cell.classList.toggle("selected");

		setSelectedHorses((prevSelectedHorses) => ({
			...prevSelectedHorses,
			[`${round}-${horseId}`]: cell.classList.contains("selected"),
		}));
	};

	const countSelections = (round) => {
		return Array.from(
			document.querySelectorAll(`.horse-cell.selected`),
		).filter((cell) => cell.getAttribute("data-round") == round).length;
	};

	const lockRound = (round) => {
		document
			.querySelectorAll(`[onclick*="toggleSelection(this, ${round},"]`)
			.forEach((cell) => cell.classList.add("locked"));
	};

	const lockHorse = (round, horseId) => {
		document
			.querySelectorAll(
				`[onclick*="toggleSelection(this, ${round}, ${horseId}"]`,
			)
			.forEach((cell) => cell.classList.add("locked"));
	};

	const resetSelection = () => {
		document
			.querySelectorAll(".horse-cell.selected")
			.forEach((cell) => cell.classList.remove("selected"));

		setSelectedHorses({});
	};

	const submitPrediction = () => {
		alert("Your prediction has been submitted.");
		resetSelection();
	};

	return (
		<div className="container">
			<button
				style={{
					userSelect: "none",
				}}
				className="back-button"
				onClick={() => window.history.back()}>
				{'<'}
			</button>
			<br/>
			<br/>
			<div className="header">
				<div className="container text-center pb-0">
					<div className="row gx-2">
						<div className="col-3">
							<button
								className={`btn btn-warning btn-custom ${
									currentOption === "chance" ? "btn-active" : ""
								}`}
								onClick={() => selectOption("chance")}>
								More Chance
							</button>
						</div>
						<div className="col-3">
							<button
								className={`btn btn-warning btn-custom ${
									currentOption === "firstSecond" ? "btn-active" : ""
								}`}
								onClick={() => selectOption("firstSecond")}>
								First Two
							</button>
						</div>
						<div className="col-3">
							<button
								className={`btn btn-warning btn-custom ${
									currentOption === "fourByFour" ? "btn-active" : ""
								}`}
								onClick={() => selectOption("fourByFour")}>
								4 Out of 4
							</button>
						</div>
						<div className="col-3">
							<button
								className={`btn btn-warning btn-custom ${
									currentOption === "sixWinner" ? "btn-active" : ""
								}`}
								onClick={() => selectOption("sixWinner")}>
								Six Winners
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="table-container">
				<table className="race-table">
					<thead>
					<tr>
						<th>Number</th>
						<th>Round 1</th>
						<th>Round 2</th>
						<th>Round 3</th>
						<th>Round 4</th>
						<th>Round 5</th>
						<th>Round 6</th>
						<th>Round 7</th>
						<th>Round 8</th>
					</tr>
					</thead>
					<tbody>
					{horses.map((_, index) => (
						<tr key={index}>
							<td>{index}</td>
							{[...Array(8)].map((_, index2) => (
								<td
									key={index2}
									className="horse-cell"
									onClick={(e) =>
										toggleSelection(e.target, index + 1, 1)
									}>
									Horse {1 + index}
								</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
			</div>
			<div className="submit-section">
				<button
					className="submit-button"
					onClick={submitPrediction}>
					Submit
				</button>
				<button
					className="reset-button"
					onClick={resetSelection}>
					Reset Selections
				</button>
			</div>
		</div>
	);
};

export default Crowd;
