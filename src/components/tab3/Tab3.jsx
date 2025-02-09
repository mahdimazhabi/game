import { useState } from "react";
import "./Tab3.css";

const Tab3 = () => {
  const [groupStandings, setGroupStandings] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
  });

  const [roundOf16, setRoundOf16] = useState([]);
  const [quarterFinals, setQuarterFinals] = useState([]);
  const [semiFinals, setSemiFinals] = useState([]);
  const [finalTeams, setFinalTeams] = useState([]);
  const [isPredictionSubmitted, setIsPredictionSubmitted] = useState(false);

  const groups = {
    A: [
      "Palmeiras (Brazil)",
      "Porto (Portugal)",
      "Al Ahly (Egypt)",
      "Inter Miami (USA)",
    ],
    B: [
      "Paris Saint-Germain (France)",
      "Atletico Madrid (Spain)",
      "Botafogo (Brazil)",
      "Seattle Sounders (USA)",
    ],
    C: [
      "Bayern Munich (Germany)",
      "Benfica (Portugal)",
      "Boca Juniors (Argentina)",
      "Auckland City (New Zealand)",
    ],
    D: [
      "Flamengo (Brazil)",
      "Chelsea (England)",
      "Leon (Mexico)",
      "Esperance Tunis (Tunisia)",
    ],
    E: [
      "River Plate (Argentina)",
      "Inter Milan (Italy)",
      "Monterrey (Mexico)",
      "Urawa Reds (Japan)",
    ],
    F: [
      "Fluminense (Brazil)",
      "Borussia Dortmund (Germany)",
      "Ulsan Hyundai (South Korea)",
      "Mamelodi Sundowns (South Africa)",
    ],
    G: [
      "Manchester City (England)",
      "Juventus (Italy)",
      "Wydad Casablanca (Morocco)",
      "Al Ain (UAE)",
    ],
    H: [
      "Real Madrid (Spain)",
      "Salzburg (Austria)",
      "Al Hilal (Saudi Arabia)",
      "Pachuca (Mexico)",
    ],
  };

  // Handle Team Position Change
  const setTeamPosition = (group, team, position) => {
    if (position >= 1 && position <= 4) {
      setGroupStandings((prevStandings) => ({
        ...prevStandings,
        [group]: prevStandings[group].map((t, idx) =>
          idx === position - 1 ? team : t
        ),
      }));
    } else {
      alert("Please enter a number between 1 and 4!");
    }
  };

  // Handle Group Display Updates
  const displayGroups = () => {
    return Object.keys(groups).map((group) => (
      <div className="group" key={group}>
        <h3>Group {group}</h3>
        {groups[group].map((team) => (
          <div
            key={team}
            className="team"
            onClick={() => {
              const position = prompt(
                `Enter the position for ${team} (1 to 4):`
              );
              setTeamPosition(group, team, parseInt(position, 10));
            }}
          >
            {team}
          </div>
        ))}
      </div>
    ));
  };

  // Handle Round of 16
  const confirmGroups = () => {
    const roundMatches = [
      [groupStandings.A[0], groupStandings.B[1]], // 1A vs 2B
      [groupStandings.C[0], groupStandings.D[1]], // 1C vs 2D
      [groupStandings.E[0], groupStandings.F[1]], // 1E vs 2F
      [groupStandings.G[0], groupStandings.H[1]], // 1G vs 2H
      [groupStandings.B[0], groupStandings.A[1]], // 1B vs 2A
      [groupStandings.D[0], groupStandings.C[1]], // 1D vs 2C
      [groupStandings.F[0], groupStandings.E[1]], // 1F vs 2E
      [groupStandings.H[0], groupStandings.G[1]], // 1H vs 2G
    ];
    setRoundOf16(roundMatches);
  };

  const selectWinner = (matchIndex, winner) => {
    const updatedMatches = roundOf16.map((match, idx) =>
      idx === matchIndex ? [winner, match[1]] : match
    );
    setRoundOf16(updatedMatches);
  };

  const continueToQuarterFinals = () => {
    const winners = roundOf16.map((match) => match[0]);
    setQuarterFinals([
      [winners[0], winners[1]],
      [winners[2], winners[3]],
      [winners[4], winners[5]],
      [winners[6], winners[7]],
    ]);
  };

  const continueToSemiFinals = () => {
    const winners = quarterFinals.map((match) => match[0]);
    setSemiFinals([
      [winners[0], winners[1]],
      [winners[2], winners[3]],
    ]);
  };

  const continueToFinal = () => {
    const winners = semiFinals.map((match) => match[0]);
    setFinalTeams(winners);
  };

  const submitPrediction = async (winner) => {
    const username = "user1"; // Replace with actual username
    const predictions = groupStandings;

    try {
      const response = await fetch("/api/survey/submitPrediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username: username, Predictions: predictions }),
      });

      if (response.ok) {
        setIsPredictionSubmitted(true);
      } else {
        alert("Failed to submit prediction.");
      }
    } catch (error) {
      console.error("Error submitting prediction:", error);
    }
  };

  return (
    <div className="container5">
      <h1>2025 FIFA Club World Cup Predictor</h1>

      {/* Group Stage */}
      <div id="group-stage">
        <h2>Group Stage</h2>
        <div id="groups-container">{displayGroups()}</div>
        <button onClick={confirmGroups}>Confirm Groups</button>
      </div>

      {/* Round of 16 */}
      <div id="round-of-16" className={roundOf16.length > 0 ? "" : "hidden"}>
        <h2>Round of 16</h2>
        <div id="round-of-16-matches">
          {roundOf16.map((match, index) => (
            <div className="match" key={index}>
              <div
                className="team"
                onClick={() => selectWinner(index, match[0])}
              >
                {match[0]}
              </div>
              <div
                className="team"
                onClick={() => selectWinner(index, match[1])}
              >
                {match[1]}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={continueToQuarterFinals}
          disabled={roundOf16.some((match) => !match[0] || !match[1])}
        >
          Continue to Quarter Finals
        </button>
      </div>

      {/* Quarter Finals */}
      <div
        id="quarter-finals"
        className={quarterFinals.length > 0 ? "" : "hidden"}
      >
        <h2>Quarter Finals</h2>
        <div id="quarter-final-matches">
          {quarterFinals.map((match, index) => (
            <div className="match" key={index}>
              <div
                className="team"
                onClick={() => selectWinner(index, match[0])}
              >
                {match[0]}
              </div>
              <div
                className="team"
                onClick={() => selectWinner(index, match[1])}
              >
                {match[1]}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={continueToSemiFinals}
          disabled={quarterFinals.some((match) => !match[0] || !match[1])}
        >
          Continue to Semi Finals
        </button>
      </div>

      {/* Semi Finals */}
      <div id="semi-finals" className={semiFinals.length > 0 ? "" : "hidden"}>
        <h2>Semi Finals</h2>
        <div id="semi-final-matches">
          {semiFinals.map((match, index) => (
            <div className="match" key={index}>
              <div
                className="team"
                onClick={() => selectWinner(index, match[0])}
              >
                {match[0]}
              </div>
              <div
                className="team"
                onClick={() => selectWinner(index, match[1])}
              >
                {match[1]}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={continueToFinal}
          disabled={semiFinals.some((match) => !match[0] || !match[1])}
        >
          Continue to Final
        </button>
      </div>

      {/* Final */}
      <div id="final" className={finalTeams.length > 0 ? "" : "hidden"}>
        <h2>Final</h2>
        <div id="final-match">
          <div className="team" onClick={() => submitPrediction(finalTeams[0])}>
            {finalTeams[0]}
          </div>
          <div className="team" onClick={() => submitPrediction(finalTeams[1])}>
            {finalTeams[1]}
          </div>
        </div>
        <button onClick={() => submitPrediction(finalTeams[0])}>
          Submit Prediction
        </button>
      </div>

      {/* Prediction Submitted */}
      {isPredictionSubmitted && <div>Prediction Submitted Successfully!</div>}
    </div>
  );
};

export default Tab3;
