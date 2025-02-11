import { useState } from "react";
import "./Crowd.css";

const Crowd = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [selectedHorses, setSelectedHorses] = useState({});

  const goBack = () => {
    window.history.back();
  };

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
    return Array.from(document.querySelectorAll(`.horse-cell.selected`)).filter(
      (cell) => cell.getAttribute("data-round") == round
    ).length;
  };

  const lockRound = (round) => {
    document
      .querySelectorAll(`[onclick*="toggleSelection(this, ${round},"]`)
      .forEach((cell) => cell.classList.add("locked"));
  };

  const lockHorse = (round, horseId) => {
    document
      .querySelectorAll(
        `[onclick*="toggleSelection(this, ${round}, ${horseId}"]`
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
      <button className="back-button" onClick={goBack}></button>
      <div className="header">
        <div className="options-bar">
          <button
            className={`option-button ${
              currentOption === "chance" ? "selected" : ""
            }`}
            onClick={() => selectOption("chance")}
          >
            More Chance
          </button>
          <button
            className={`option-button ${
              currentOption === "firstSecond" ? "selected" : ""
            }`}
            onClick={() => selectOption("firstSecond")}
          >
            First Two
          </button>
          <button
            className={`option-button ${
              currentOption === "fourByFour" ? "selected" : ""
            }`}
            onClick={() => selectOption("fourByFour")}
          >
            Four Out of Four
          </button>
          <button
            className={`option-button ${
              currentOption === "sixWinner" ? "selected" : ""
            }`}
            onClick={() => selectOption("sixWinner")}
          >
            Six Winners
          </button>
        </div>
      </div>

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
          <tr>
            <td>1</td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 1, 1)}
            >
              Horse 1
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 2, 1)}
            >
              Horse 2
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 3, 1)}
            >
              Horse 3
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 4, 1)}
            >
              Horse 4
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 5, 1)}
            >
              Horse 5
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 6, 1)}
            >
              Horse 6
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 7, 1)}
            >
              Horse 7
            </td>
            <td
              className="horse-cell"
              onClick={(e) => toggleSelection(e.target, 8, 1)}
            >
              Horse 8
            </td>
          </tr>
          {/* You can add more rows as needed */}
        </tbody>
      </table>

      <div className="submit-section">
        <button className="submit-button" onClick={submitPrediction}>
          Submit
        </button>
        <button className="reset-button" onClick={resetSelection}>
          Reset Selections
        </button>
      </div>
    </div>
  );
};

export default Crowd;
