import { useState, useEffect } from "react";
import "./FootballPredictionSystem.css";


const FootballPredictionSystem = () => {
  const [selectedVote, setSelectedVote] = useState(null);
  const [votes, setVotes] = useState({ home: 0, draw: 0, away: 0 });
  const [countdown, setCountdown] = useState("00:00:00");
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const matchTime = new Date("2023-12-01T20:00:00Z").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = matchTime - now;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      );

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("Match has started!");
      }
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const selectVote = (vote) => {
    setSelectedVote(vote);
    setIsVoteSubmitted(false);
  };

  const submitVote = () => {
    if (selectedVote) {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedVote]: prevVotes[selectedVote] + 1,
      }));
      setIsVoteSubmitted(true);
      setShowResults(true);
    }
  };

  const updateResults = () => {
    const totalVotes = votes.home + votes.draw + votes.away;
    if (totalVotes > 0) {
      const homePercent = (votes.home / totalVotes) * 100;
      const drawPercent = (votes.draw / totalVotes) * 100;
      const awayPercent = (votes.away / totalVotes) * 100;

      return {
        homePercent: Math.round(homePercent),
        drawPercent: Math.round(drawPercent),
        awayPercent: Math.round(awayPercent),
      };
    }
    return { homePercent: 0, drawPercent: 0, awayPercent: 0 };
  };

  const { homePercent, drawPercent, awayPercent } = updateResults();

  return (
    <div className="background-image">
      <div className="container">
        <div className="header">
          {/* <a className="button-30" role="button" href="#" onClick={goBack}>
            {"<"}
          </a> */}
        </div>
        <div className="match-info">
          <h1>Match Prediction</h1>
          <p id="teamNames">Home Team vs Away Team</p>
          <p id="matchDate">
            Match Date: <span id="date">2023/12/01</span>
          </p>
          <p className="countdown" id="countdown">
            {countdown}
          </p>
        </div>
        <div className="vote-section">
          <button
            className={`button-33 ${selectedVote === "home" ? "selected" : ""}`}
            role="button"
            onClick={() => selectVote("home")}
          >
            Home Win
          </button>
          <button
            className={`button-33 ${selectedVote === "draw" ? "selected" : ""}`}
            role="button"
            onClick={() => selectVote("draw")}
          >
            Draw
          </button>
          <button
            className={`button-33 ${selectedVote === "away" ? "selected" : ""}`}
            role="button"
            onClick={() => selectVote("away")}
          >
            Away Win
          </button>
        </div>
        <div className="vote-section">
          <button
            className="button-30"
            role="button"
            onClick={submitVote}
            disabled={!selectedVote}
          >
            Submit Vote
          </button>
        </div>
        {isVoteSubmitted && (
          <div id="resultMessage" className="result-message">
            Your vote has been successfully submitted!
          </div>
        )}
        {showResults && (
          <div className="results" id="resultsSection">
            <div className="result-bar">
              <div className="bar">
                <div
                  className="bar-fill home"
                  id="homeBar"
                  style={{ height: `${homePercent}%` }}
                ></div>
                <div className="percentage" id="homePercent">
                  {homePercent}%
                </div>
              </div>
              <p>Home Win</p>
            </div>
            <div className="result-bar">
              <div className="bar">
                <div
                  className="bar-fill draw"
                  id="drawBar"
                  style={{ height: `${drawPercent}%` }}
                ></div>
                <div className="percentage" id="drawPercent">
                  {drawPercent}%
                </div>
              </div>
              <p>Draw</p>
            </div>
            <div className="result-bar">
              <div className="bar">
                <div
                  className="bar-fill away"
                  id="awayBar"
                  style={{ height: `${awayPercent}%` }}
                ></div>
                <div className="percentage" id="awayPercent">
                  {awayPercent}%
                </div>
              </div>
              <p>Away Win</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootballPredictionSystem;
