import {useEffect, useState} from 'react';
import './FootballPrediction.css';
import testLogo from './../../assets/img/download.png';
import useFootballApi from "../../api/FootballAPI/useFootballApi.jsx";
const FootballPredictionEn = () => {
    const [matches, setMatches] = useState([]);
    const {getSingleGame, addPrediction} = useFootballApi()
    const [selectedResults, setSelectedResults] = useState(matches.map(() => []));
    const [errors, setErrors] = useState(matches.map(() => false));

    const handleCheckboxChange = (matchIndex, result) => {
        const newSelectedResults = selectedResults.map((results, index) =>
            index === matchIndex ?
                results.includes(result) ?
                    results.filter(r => r !== result) :
                    [...results, result]
                : results
        );
        setSelectedResults(newSelectedResults);

        if (newSelectedResults[matchIndex].length > 0) {
            setErrors(errors.map((error, index) => index === matchIndex ? false : error));
        }
    };

    const handleSubmit = async () => {
        const newErrors = selectedResults.map(results => results.length === 0);
        setErrors(newErrors);

        if (newErrors.some(error => error)) {
            if (navigator.vibrate) navigator.vibrate(200);
            alert("Please select at least one option from each row!");
            return;
        }

        const results = matches.map((match, index) => ({
            match: `${match.nameOne} vs ${match.nameTwo}`,
            results: selectedResults[index]
        }));

        setSelectedResults(matches.map(() => []));
        setErrors(matches.map(() => false));
        for (const result of results) {
            const index = results.indexOf(result);
            await addPrediction({
                "competitionId": matches[index].competitionId,
                "userId": parseInt(localStorage.getItem("userId")),
                "winOne": result.includes("Win"),
                "winTwo": result.includes("Lose"),
                "equal": result.includes("Draw"),
                "ascendantTeam": ""
            })
        }
        alert("Submitted Results:\n" + results.map(result =>
            `${result.match}: ${result.results.join(', ')}`
        ).join('\n'));

    };
    const getGame = async () => {
        const game = await getSingleGame();
        setMatches(game);
    }
    useEffect(() => {
        getGame().then();
    })

    return (
        <div dir="rtl" lang="en" className="match-table-container">
            <button
                style={{
                    userSelect: "none",
                }}
                className="back-button"
                onClick={() => window.history.back()}>
                {'>'}
            </button>
            <h1 className='page-title'>Football Matches Table</h1>
            <table>
                <thead>
                <tr>
                    <th>Time</th>
                    <th>League Logo</th>
                    <th>Guest</th>
                    <th>Results</th>
                    <th>Host</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={match.competitionId} className={errors[index] ? 'error' : ''}>
                        <td data-label="Time">{match.deadline}</td>
                        <td data-label="League Logo">
                            <img src={testLogo} alt={`${match.nameOne} league`} className="league-logo"/>
                        </td>
                        <td data-label="Guest">{match.nameTwo}</td>
                        <td data-label="Results">
                            <div className="checkboxes">
                                {['Win', 'Draw', 'Lose'].map((result) => (
                                    <div key={result} className="checkbox-item">
                                        <label htmlFor={result} className={'checkbox-label'}>
                                            {result}
                                        </label>
                                        <input
                                            className={'checkbox-input'}
                                            id={result}
                                            type="checkbox"
                                            checked={selectedResults[index].includes(result)}
                                            onChange={() => handleCheckboxChange(index, result)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </td>
                        <td data-label="Host">{match.nameOne}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className={'button-submit'} onClick={handleSubmit}>Submit Results</button>
        </div>
    );
};

export default FootballPredictionEn;