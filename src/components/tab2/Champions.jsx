import {useEffect, useState} from "react";
import "./Champions.css";
import useFootballApi from "../../api/FootballAPI/useFootballApi.jsx";

const {addPrediction, editPrediction, getAllFootballUser, getAllFootball} = useFootballApi()
const groupMatches = (allMatches, userMatches) => {
    return allMatches.map((match) => {
        let come = { ...match, competitionUserId: null, prediction: "", ascendantTeam: "" };
        let away = { ...match, competitionUserId: null, prediction: "", ascendantTeam: "" };

        const preds = userMatches.filter((um) => um.competitionId === match.competitionId);
        if (preds && preds.length > 0) {
            const sorted = preds.sort((a, b) => a.competitionUserId - b.competitionUserId);
            come = {
                ...come,
                competitionUserId: sorted[0].competitionUserId,
                prediction: sorted[0].equal
                    ? "Draw"
                    : sorted[0].winOne
                        ? "teamOne"
                        : sorted[0].winTwo
                            ? "teamTwo"
                            : "",
                ascendantTeam: sorted[0].ascendantTeam || "",
            };
            if (sorted.length > 1) {
                away = {
                    ...away,
                    competitionUserId: sorted[1].competitionUserId,
                    prediction: sorted[1].equal
                        ? "Draw"
                        : sorted[1].winOne
                            ? "teamOne"
                            : sorted[1].winTwo
                                ? "teamTwo"
                                : "",
                    ascendantTeam: sorted[1].ascendantTeam || "",
                };
            }
        }
        return [come, away];
    });
};
const Champions = () => {
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

    const [finalWinner, setFinalWinner] = useState("");

    const calculateResults = () => {
        const winners = {
            match1: document.getElementById("match1-winner").value,
            match2: document.getElementById("match2-winner").value,
            match3: document.getElementById("match3-winner").value,
            match4: document.getElementById("match4-winner").value,
            match5: document.getElementById("match5-winner").value,
            match6: document.getElementById("match6-winner").value,
            match7: document.getElementById("match7-winner").value,
            match8: document.getElementById("match8-winner").value,
        };

        setResults(winners);
        const final = winners.match1; // You can add your logic for final winner selection
        setFinalWinner(final);
    };
    const [allMatches, setAllMatches] = useState([]);
    const [userMatches, setUserMatches] = useState([]);
    const [groupedMatches, setGroupedMatches] = useState([]);

    // Fetch all matches and user predictions, then group them
    const fetchData = async () => {
        const all = await getAllFootball();
        const userPreds = await getAllFootballUser();
        setAllMatches(all);
        setUserMatches(userPreds);
        setGroupedMatches(groupMatches(all, userPreds));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (groupIndex, sideIndex, field, value) => {
        setGroupedMatches((prev) => {
            const newGroups = [...prev];
            if (field === "status") {
                newGroups[groupIndex][sideIndex].prediction = value;
            } else if (field === "ascendant") {
                newGroups[groupIndex][0].ascendantTeam = value;
                newGroups[groupIndex][1].ascendantTeam = value;
            }
            return newGroups;
        });
    };

    const convertPrediction = (prediction) => {
        if (prediction === "teamOne") {
            return { winOne: true, winTwo: false, equal: false };
        } else if (prediction === "teamTwo") {
            return { winOne: false, winTwo: true, equal: false };
        } else if (prediction === "Draw") {
            return { winOne: false, winTwo: false, equal: true };
        }
        return { winOne: false, winTwo: false, equal: false };
    };

    const handleSubmit = async () => {
        const userId = parseInt(localStorage.getItem("userId"));
        for (const group of groupedMatches) {
            const competitionId = group[0].competitionId;
            const ascendantTeam = group[0].ascendantTeam; // same for both objects
            const commonData = { competitionId, userId, ascendantTeam, resultCheck: 3 };

            // Process each side in the group (come and away)
            for (const predictionObj of group) {
                const converted = convertPrediction(predictionObj.prediction);
                const payload = { ...commonData, ...converted };
                if (predictionObj.competitionUserId) {
                    // Edit the existing prediction
                    payload.competitionUserId = predictionObj.competitionUserId;
                    await editPrediction(payload);
                } else {
                    // Add a new prediction for this side
                    await addPrediction(payload);
                }
            }
        }
        await fetchData();
    };
    return (
        <div className="container3">
            <h1>Football Tournament Bracket - Home and Away</h1>
            <a href="index.html" className="back-btn">
                Back to main page
            </a>
            <div className="bracket">
                {/* Round 1 */}
                <div className="round">
                    {groupedMatches.map((group, index) => (
                        <div className="match" key={index}>
                            <label>{`Team ${group[0].nameOne} vs Team ${group[0].nameTwo}`}</label>
                            {/* Come Prediction Select */}
                            <select
                                id={`match${index + 1}-raft-1`}
                                required
                                value={group[0].prediction}
                                onChange={(e) => handleChange(index, 0, "status", e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="teamOne">{group[0].nameOne} wins</option>
                                <option value="Draw">Draw</option>
                                <option value="teamTwo">{group[0].nameTwo} wins</option>
                            </select>
                            {/* Away Prediction Select */}
                            <select
                                id={`match${index + 1}-raft-2`}
                                required
                                value={group[1].prediction}
                                onChange={(e) => handleChange(index, 1, "status", e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value="teamOne">{group[1].nameOne} wins</option>
                                <option value="Draw">Draw</option>
                                <option value="teamTwo">{group[1].nameTwo} wins</option>
                            </select>
                            <label>Advancing team:</label>
                            {/* Ascendant Team Select – common for both predictions */}
                            <select
                                id={`match${index + 1}-winner`}
                                required
                                value={group[0].ascendantTeam}
                                onChange={(e) => handleChange(index, 0, "ascendant", e.target.value)}
                            >
                                <option value="">Select</option>
                                <option value={group[0].nameOne}>{group[0].nameOne}</option>
                                <option value={group[0].nameTwo}>{group[0].nameTwo}</option>
                            </select>
                        </div>
                    ))}
                </div>

                {/*/!* Round 2 *!/*/}
                {/*<div className="round">*/}
                {/*    {["I", "J", "K", "L", "M", "N", "O", "P"].map((team, index) => (*/}
                {/*        <div className="match" key={index}>*/}
                {/*            <label>{`Team ${team} vs Team ${String.fromCharCode(*/}
                {/*                73 + index + 1*/}
                {/*            )}`}</label>*/}
                {/*            <select id={`match${index + 5}-raft`} required>*/}
                {/*                <option value="">Select</option>*/}
                {/*                <option value="Team 1 wins">Team 1 wins</option>*/}
                {/*                <option value="Draw">Draw</option>*/}
                {/*                <option value="Team 2 wins">Team 2 wins</option>*/}
                {/*            </select>*/}
                {/*            <select id={`match${index + 5}-bargasht`} required>*/}
                {/*                <option value="">Select</option>*/}
                {/*                <option value="Team 1 wins">Team 1 wins</option>*/}
                {/*                <option value="Draw">Draw</option>*/}
                {/*                <option value="Team 2 wins">Team 2 wins</option>*/}
                {/*            </select>*/}
                {/*            <label>Advancing team:</label>*/}
                {/*            <select id={`match${index + 5}-winner`} required>*/}
                {/*                <option value="">Select</option>*/}
                {/*                <option value={`Team ${team}`}>{`Team ${team}`}</option>*/}
                {/*                <option*/}
                {/*                    value={`Team ${String.fromCharCode(73 + index + 1)}`}*/}
                {/*                >{`Team ${String.fromCharCode(73 + index + 1)}`}</option>*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>

            <button onClick={calculateResults}>
                Calculate Results and Advancing Team
            </button>
            <button onClick={handleSubmit}>
                Submit results
            </button>
            <div id="result">
                <h2>Results:</h2>
                <ul>
                    {Object.entries(results).map(([match, winner]) => (
                        <li key={match}>
                            {match}: {winner}
                        </li>
                    ))}
                </ul>
            </div>

            <h2>Final Advancing Team</h2>
            <div id="final-winner">{finalWinner}</div>
        </div>
    );
};

export default Champions;
