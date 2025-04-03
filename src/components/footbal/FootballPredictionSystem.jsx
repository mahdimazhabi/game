import {useState, useEffect} from "react";
import "./FootballPredictionSystem.css";
import {Link} from "react-router-dom";
import useFootballApi from "../../api/FootballAPI/useFootballApi.jsx";

const FootballPredictionSystem = () => {
    const {getAllBigGames, getAllUsersCompetitionById, addPrediction} = useFootballApi()
    const [selectedVote, setSelectedVote] = useState(
        localStorage.getItem("userVote") || null
    );
    const [userGame, setUserGame] = useState({})
    const [votes, setVotes] = useState({home: 0, draw: 0, away: 0});
    const [countdown, setCountdown] = useState("00:00:00");
    const [isVoteSubmitted, setIsVoteSubmitted] = useState();
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        winOneRate: null,
        drawRate: null,
        winTwoRate: null,
    })
    const matchTime = new Date("2023-12-01T20:00:00Z").getTime();
    const [bigGame, setBigGame] = useState({})
    const getBigGame = async () => {
        const allGames = await getAllBigGames()
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const filteredList = allGames.filter(item => {
            const [year, month, day] = item.deadLine.split('/');
            const deadlineDate = new Date(year, month - 1, day);
            return deadlineDate >= currentDate;
        });

        if (filteredList.length > 0) {
            setBigGame(filteredList[0]);
            const usersGames = await getAllUsersCompetitionById(filteredList[0].competitionId);
            const userData = usersGames.filter(item => parseInt(localStorage.getItem("userId")) === item.userId)
            if (userData.length > 0) {
                setUserGame(userData);
                setIsVoteSubmitted(true)
                let winOneCount = 0
                let winTwoCount = 0
                let drawCount = 0
                usersGames.forEach(item => {
                    if (item.winOne) {
                        winOneCount += 1
                    }
                    if (item.winTwo) {
                        winTwoCount += 1
                    }
                    if (item.draw) {
                        drawCount += 1
                    }
                })
                setResults({
                    winOneRate: winOneCount/usersGames.length,
                    drawRate: drawCount/usersGames.length,
                    winTwoRate: winTwoCount/usersGames.length,
                })
                setShowResults(true);
            }
        }
    }
    useEffect(() => {
        getBigGame().then();
    }, []);
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

        return () => clearInterval(interval);
    }, []);

    const selectVote = (vote) => {
        setSelectedVote(vote);
    };

    const submitVote = async () => {
        if (selectedVote && !isVoteSubmitted) {
            await addPrediction({
                "competitionId": bigGame.competitionId,
                "userId": parseInt(localStorage.getItem("userId")),
                "winOne": selectedVote === "home",
                "winTwo": selectedVote === "away",
                "equal": selectedVote === "equal",
                "ascendantTeam": ""
            })
            setIsVoteSubmitted(true);
            getBigGame().then();
            setShowResults(true);
        }
    };

    return (
        <div className="background-image">
            <div className="tab2">
                <Link to="/page1" className="tab-x tab-1">
                    Team Formation Builder
                </Link>
                <div
                    // to="/page2"
                    className="tab-x tab-2"
                >
                    Select League
                </div>
                <Link to="/page3" className="tab-x tab-3">
                    World Cup Predictor
                </Link>
            </div>
            {bigGame &&
            <div className="container">
                <div className="match-info">
                    <h1>Match Prediction</h1>
                    <p id="teamNames">{bigGame.nameOne} vs {bigGame.nameTwo}</p>
                    <p id="matchDate">
                        Match Date: <span id="date">{bigGame.deadLine}</span>
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
                        disabled={!!userGame.competitionId}
                    >
                        {bigGame.nameOne} Win
                    </button>
                    <button
                        className={`button-33 ${selectedVote === "draw" ? "selected" : ""}`}
                        role="button"
                        onClick={() => selectVote("draw")}
                        disabled={!!userGame.competitionId}
                    >
                        Draw
                    </button>
                    <button
                        className={`button-33 ${selectedVote === "away" ? "selected" : ""}`}
                        role="button"
                        onClick={() => selectVote("away")}
                        disabled={!!userGame.competitionId}
                    >
                        {bigGame.nameTwo} Win
                    </button>
                </div>
                <div className="vote-section">
                    <button
                        className="button-30"
                        role="button"
                        onClick={submitVote}
                        disabled={!selectedVote || !!userGame.competitionId}
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
                                    style={{height: `${results.winOneRate*100}%`}}
                                ></div>
                                <div className="percentage" id="homePercent">
                                    {results.winOneRate*100}%
                                </div>
                            </div>
                            <p>{bigGame.nameOne} Win</p>
                        </div>
                        <div className="result-bar">
                            <div className="bar">
                                <div
                                    className="bar-fill draw"
                                    id="drawBar"
                                    style={{height: `${results.drawRate*100}%`}}
                                ></div>
                                <div className="percentage" id="drawPercent">
                                    {results.drawRate*100}%
                                </div>
                            </div>
                            <p>Draw</p>
                        </div>
                        <div className="result-bar">
                            <div className="bar">
                                <div
                                    className="bar-fill away"
                                    id="awayBar"
                                    style={{height: `${results.winTwoRate*100}%`}}
                                ></div>
                                <div className="percentage" id="awayPercent">
                                    {results.winTwoRate*100}%
                                </div>
                            </div>
                            <p>{bigGame.nameTwo} Win</p>
                        </div>
                    </div>
                )}
            </div>
            }
        </div>
    );
};

export default FootballPredictionSystem;
