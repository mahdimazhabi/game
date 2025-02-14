import {useState} from 'react';
import './FootballPrediction.css';
import testLogo from './../../assets/img/download.png';
const FootballPredictionEn = () => {
    const [matches, ] = useState([
        {id: 1, time: '17:55', logo: testLogo, guest: 'Saudi Arabia', host: 'Yemen'},
        {id: 2, time: '21:00', logo: testLogo, guest: 'Iraq', host: 'Bahrain'}
    ]);

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

    const handleSubmit = () => {
        const newErrors = selectedResults.map(results => results.length === 0);
        setErrors(newErrors);

        if (newErrors.some(error => error)) {
            if (navigator.vibrate) navigator.vibrate(200);
            alert("Please select at least one option from each row!");
            return;
        }

        const results = matches.map((match, index) => ({
            match: `${match.host} vs ${match.guest}`,
            results: selectedResults[index]
        }));

        alert("Submitted Results:\n" + results.map(result =>
            `${result.match}: ${result.results.join(', ')}`
        ).join('\n'));

        setSelectedResults(matches.map(() => []));
        setErrors(matches.map(() => false));
    };
    const goBack = () => {
        window.history.back(); // Navigate to the previous page
    }
    return (
        <div dir="rtl" lang="en" className="match-table-container">
            <button className="back-button" onClick={goBack}>{">"}</button>
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
                    <tr key={match.id} className={errors[index] ? 'error' : ''}>
                        <td data-label="Time">{match.time}</td>
                        <td data-label="League Logo">
                            <img src={match.logo} alt={`${match.host} league`} className="league-logo"/>
                        </td>
                        <td data-label="Guest">{match.guest}</td>
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
                        <td data-label="Host">{match.host}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className={'button-submit'} onClick={handleSubmit}>Submit Results</button>
        </div>
    );
};

export default FootballPredictionEn;