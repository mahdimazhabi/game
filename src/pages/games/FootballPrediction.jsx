import {useState} from 'react';
import './FootballPrediction.css';

const FootballPrediction = () => {
    const [matches, ] = useState([
        {id: 1, time: '17:55', logo: 'logo_url_1.png', guest: 'عربستان', host: 'یمن'},
        {id: 2, time: '21:00', logo: 'logo_url_2.png', guest: 'عراق', host: 'بحرین'}
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
            alert("لطفا از هر ردیف حداقل یک گزینه را انتخاب کنید!");
            return;
        }

        const results = matches.map((match, index) => ({
            match: `${match.host} vs ${match.guest}`,
            results: selectedResults[index]
        }));

        alert("نتایج ثبت شده:\n" + results.map(result =>
            `${result.match}: ${result.results.join(', ')}`
        ).join('\n'));

        setSelectedResults(matches.map(() => []));
        setErrors(matches.map(() => false));
    };
    const goBack = () => {
        window.history.back(); // Navigate to the previous page
    }
    return (
        <div dir="rtl" lang="fa" className="match-table-container">
            <button className="back-button" onClick={goBack}>{">"}</button>
            <h1 className={'page-title'}>جدول مسابقات فوتبال</h1>
            <table>
                <thead>
                <tr>
                    <th>ساعت</th>
                    <th>لوگو لیگ</th>
                    <th>میهمان</th>
                    <th>نتایج</th>
                    <th>میزبان</th>
                </tr>
                </thead>
                <tbody>
                {matches.map((match, index) => (
                    <tr key={match.id} className={errors[index] ? 'error' : ''}>
                        <td data-label="ساعت">{match.time}</td>
                        <td data-label="لوگو لیگ">
                            <img src={match.logo} alt={`لیگ ${match.host}`} className="league-logo"/>
                        </td>
                        <td data-label="میهمان">{match.guest}</td>
                        <td data-label="نتایج">
                            <div className="checkboxes">
                                {['برد', 'مساوی', 'باخت'].map((result) => (
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
                        <td data-label="میزبان">{match.host}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className={'button-submit'} onClick={handleSubmit}>ثبت نتایج</button>
        </div>
    );
};

export default FootballPrediction;