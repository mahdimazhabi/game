import { useState } from "react";
import "./Conference.css";
const Conference = () => {
  const [results, setResults] = useState({
    match1: "",
    match2: "",
    match3: "",
    match4: "",
    match5: "",
    match6: "",
    match7: "",
    match8: "",
  });

  const handleChange = (e, match) => {
    setResults({
      ...results,
      [match]: e.target.value,
    });
  };
  function calculateResults() {
    const results = [];
    const winners = []; // Array to store advancing teams
    let allSelected = true;

    for (let i = 1; i <= 8; i++) {
      const raft = document.getElementById(`match${i}-raft`).value;
      const bargasht = document.getElementById(`match${i}-bargasht`).value;
      const winner = document.getElementById(`match${i}-winner`).value; // Manually advancing team

      if (!raft || !bargasht || !winner) {
        allSelected = false;
        alert(`Please complete all selections for match ${i}.`);
        return;
      }

      const team1 = `Team ${String.fromCharCode(64 + i * 2 - 1)}`; // Team A, C, E, ...
      const team2 = `Team ${String.fromCharCode(64 + i * 2)}`; // Team B, D, F, ...

      // Calculate scores
      let team1Score = 0;
      let team2Score = 0;

      // First leg
      if (raft === "Team 1 wins") team1Score += 3;
      else if (raft === "Team 2 wins") team2Score += 3;
      else if (raft === "Draw") {
        team1Score += 1;
        team2Score += 1;
      }

      // Second leg
      if (bargasht === "Team 1 wins") team1Score += 3;
      else if (bargasht === "Team 2 wins") team2Score += 3;
      else if (bargasht === "Draw") {
        team1Score += 1;
        team2Score += 1;
      }

      // Determine advancing team
      results.push({
        match: `${team1} vs ${team2}`,
        raft: raft,
        bargasht: bargasht,
        team1Score: team1Score,
        team2Score: team2Score,
        winner: winner, // Use manually advancing team
      });

      // Store advancing team
      winners.push(winner);
    }

    if (!allSelected) {
      alert("Please complete all selections.");
      return;
    }

    // Display results
    const resultDiv = document.getElementById("result");
    let resultText = "<h2>Final Results:</h2>";
    results.forEach((result) => {
      resultText += `
            <p>
                ${result.match}:
                <br>First leg: ${result.raft}
                <br>Second leg: ${result.bargasht}
                <br>Score ${result.match.split(" vs ")[0]}: ${result.team1Score}
                <br>Score ${result.match.split(" vs ")[1]}: ${result.team2Score}
                <br>Advancing team: ${result.winner}
            </p>
        `;
    });
    resultDiv.innerHTML = resultText;

    // Calculate final advancing team
    const finalWinner = calculateFinalResults(winners);
    const finalWinnerDiv = document.getElementById("final-winner");
    finalWinnerDiv.innerHTML = `<strong>Final advancing team: ${finalWinner}</strong>`;
  }

  function calculateFinalResults(winners) {
    const semiFinalWinners = [];

    // First semi-final
    semiFinalWinners.push(determineWinner(winners[0], winners[1])); // Winner of match 1
    semiFinalWinners.push(determineWinner(winners[2], winners[3])); // Winner of match 2
    semiFinalWinners.push(determineWinner(winners[4], winners[5])); // Winner of match 3
    semiFinalWinners.push(determineWinner(winners[6], winners[7])); // Winner of match 4

    // Determine final winner
    const finalWinner = determineWinner(
      semiFinalWinners[0],
      semiFinalWinners[1]
    );
    return finalWinner;
  }

  function determineWinner(team1, team2) {
    if (team1 === team2) {
      return "Draw (needs tiebreaker)";
    }
    // Assume the first team wins
    return team1;
  }

  return (
    <div className="container4">
      <h1>Football Tournament Bracket - Home and Away</h1>
      <a href="index.html" className="back-btn">
        Back to main page
      </a>
      <div className="bracket">
        {/* Round 1 */}
        <div className="round">
          <div className="match">
            <label>AS Roma vs FC Porto</label>
            <select
              id="match1-raft"
              value={results.match1}
              onChange={(e) => handleChange(e, "match1")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match1-bargasht"
              value={results.match1}
              onChange={(e) => handleChange(e, "match1")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match1-winner"
              value={results.match1}
              onChange={(e) => handleChange(e, "match1")}
              required
            >
              <option value="">Select</option>
              <option value="AS Roma">AS Roma</option>
              <option value="FC Porto">FC Porto</option>
            </select>
          </div>
          <div className="match">
            <label>Bayer Leverkusen vs Olympiacos</label>
            <select
              id="match2-raft"
              value={results.match2}
              onChange={(e) => handleChange(e, "match2")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match2-bargasht"
              value={results.match2}
              onChange={(e) => handleChange(e, "match2")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match2-winner"
              value={results.match2}
              onChange={(e) => handleChange(e, "match2")}
              required
            >
              <option value="">Select</option>
              <option value="Bayer Leverkusen">Bayer Leverkusen</option>
              <option value="Olympiacos">Olympiacos</option>
            </select>
          </div>
          <div className="match">
            <label>West Ham United vs Fenerbahçe</label>
            <select
              id="match3-raft"
              value={results.match3}
              onChange={(e) => handleChange(e, "match3")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match3-bargasht"
              value={results.match3}
              onChange={(e) => handleChange(e, "match3")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match3-winner"
              value={results.match3}
              onChange={(e) => handleChange(e, "match3")}
              required
            >
              <option value="">Select</option>
              <option value="West Ham United">West Ham United</option>
              <option value="Fenerbahçe">Fenerbahçe</option>
            </select>
          </div>
          <div className="match">
            <label>Real Betis vs Galatasaray</label>
            <select
              id="match4-raft"
              value={results.match4}
              onChange={(e) => handleChange(e, "match4")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match4-bargasht"
              value={results.match4}
              onChange={(e) => handleChange(e, "match4")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match4-winner"
              value={results.match4}
              onChange={(e) => handleChange(e, "match4")}
              required
            >
              <option value="">Select</option>
              <option value="Real Betis">Real Betis</option>
              <option value="Galatasaray">Galatasaray</option>
            </select>
          </div>
        </div>

        {/* Round 2 */}
        <div className="round">
          <div className="match">
            <label>Sparta Prague vs Lille</label>
            <select
              id="match5-raft"
              value={results.match5}
              onChange={(e) => handleChange(e, "match5")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match5-bargasht"
              value={results.match5}
              onChange={(e) => handleChange(e, "match5")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match5-winner"
              value={results.match5}
              onChange={(e) => handleChange(e, "match5")}
              required
            >
              <option value="">Select</option>
              <option value="Sparta Prague">Sparta Prague</option>
              <option value="Lille">Lille</option>
            </select>
          </div>
          <div className="match">
            <label>Ajax vs Genk</label>
            <select
              id="match6-raft"
              value={results.match6}
              onChange={(e) => handleChange(e, "match6")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match6-bargasht"
              value={results.match6}
              onChange={(e) => handleChange(e, "match6")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match6-winner"
              value={results.match6}
              onChange={(e) => handleChange(e, "match6")}
              required
            >
              <option value="">Select</option>
              <option value="Ajax">Ajax</option>
              <option value="Genk">Genk</option>
            </select>
          </div>
          <div className="match">
            <label>Anderlecht vs Dinamo Zagreb</label>
            <select
              id="match7-raft"
              value={results.match7}
              onChange={(e) => handleChange(e, "match7")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match7-bargasht"
              value={results.match7}
              onChange={(e) => handleChange(e, "match7")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match7-winner"
              value={results.match7}
              onChange={(e) => handleChange(e, "match7")}
              required
            >
              <option value="">Select</option>
              <option value="Anderlecht">Anderlecht</option>
              <option value="Dinamo Zagreb">Dinamo Zagreb</option>
            </select>
          </div>
          <div className="match">
            <label>Sporting Braga vs Union Berlin</label>
            <select
              id="match8-raft"
              value={results.match8}
              onChange={(e) => handleChange(e, "match8")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <select
              id="match8-bargasht"
              value={results.match8}
              onChange={(e) => handleChange(e, "match8")}
              required
            >
              <option value="">Select</option>
              <option value="Team 1 wins">Team 1 wins</option>
              <option value="Draw">Draw</option>
              <option value="Team 2 wins">Team 2 wins</option>
            </select>
            <label>Advancing team:</label>
            <select
              id="match8-winner"
              value={results.match8}
              onChange={(e) => handleChange(e, "match8")}
              required
            >
              <option value="">Select</option>
              <option value="Sporting Braga">Sporting Braga</option>
              <option value="Union Berlin">Union Berlin</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={calculateResults}>Calculate Results</button>
    </div>
  );
};

export default Conference;
