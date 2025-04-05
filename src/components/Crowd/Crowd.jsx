import {useEffect, useState} from "react";
import "./Crowd.css";
import useCorsHorseApi from "../../api/CorsHorsApi/useCorseHorseAPI.jsx";

const Crowd = () => {
    const [allData, setAllData] = useState([])
    const [selectedTitleText, setSelectedTitleText] = useState("")
    const [selectedCorsTitle, setSelectedCorsTitle] = useState(
        {
            "corsTitleId": null,
            "title": "",
            "horseCanSelect": 1,
            "cors": []
        }
    )
    const {getAllData, getUserHorses, addUserHorse, deleteUserHorse} = useCorsHorseApi();
    const [selectedHorses, setSelectedHorses] = useState({});
    const [userData, setUserData] = useState([])
    const toggleSelection = (corsId, corsHorseId) => {
        setSelectedHorses(prev => ({
            ...prev,
            [corsId]: prev[corsId] === corsHorseId ? null : corsHorseId
        }));
    };

    useEffect(() => {
        (async () => {
            const data = await getAllData();
            setAllData(data);
            const userHorses = await getUserHorses();
            setUserData(userHorses);
        })();
    }, []);
    
    const selectTitle = (title) => {
        const targetTitle = allData.filter((item) => item.title === title);
        setSelectedCorsTitle(targetTitle[0])
        setSelectedTitleText(title)
    }

    // const applyOptionRules = (option) => {
    //     const horseCells = document.querySelectorAll(".horse-cell");
    //     horseCells.forEach((cell) => cell.classList.remove("locked"));
    //
    //     if (option === "fourByFour") {
    //         [6, 7, 8].forEach((round) => lockRound(round));
    //         for (let i = 1; i <= 5; i++) {
    //             for (let j = 5; j <= 8; j++) {
    //                 lockHorse(i, j);
    //             }
    //         }
    //     }
    // };

    // const toggleSelection = (cell, round, horseId) => {
    //     if (cell.classList.contains("locked")) return;
    //
    //     if (currentOption === "firstSecond" && countSelections(round) >= 2) {
    //         alert("You can only select two horses.");
    //         return;
    //     }
    //
    //     cell.classList.toggle("selected");
    //
    //     setSelectedHorses((prevSelectedHorses) => ({
    //         ...prevSelectedHorses,
    //         [`${round}-${horseId}`]: cell.classList.contains("selected"),
    //     }));
    // };

    // const lockRound = (round) => {
    //     document
    //         .querySelectorAll(`[onclick*="toggleSelection(this, ${round},"]`)
    //         .forEach((cell) => cell.classList.add("locked"));
    // };
    //
    // const lockHorse = (round, horseId) => {
    //     document
    //         .querySelectorAll(
    //             `[onclick*="toggleSelection(this, ${round}, ${horseId}"]`,
    //         )
    //         .forEach((cell) => cell.classList.add("locked"));
    // };

    const resetSelection = () => {
        // document
        //     .querySelectorAll(".horse-cell.selected")
        //     .forEach((cell) => cell.classList.remove("selected"));

        setSelectedHorses({});
    };

    const submitPrediction = async () => {
        for (const horseId of Object.values(selectedHorses)) {
            const date = new Date();
            for (const item of userData) {
                if (item.corsHorseId === horseId) {
                    await deleteUserHorse(item.corsHorseUserId)
                }
            }
            const res = await addUserHorse({
                userId: parseInt(localStorage.getItem("userId")),
                corsHorseId: horseId,
                horseSelect: 0,
                date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
                buyDate: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
            })
            if (res === "Not Enough Bronze Coin") {
                alert(res);
                resetSelection();
                return;
            }
        }
        alert("Your prediction has been submitted.");
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
            <br/>
            <div className="header">
                <div className="container text-center pb-0">
                    <div className="row gx-2">
                        {
                            allData.map(data =>
                                <div key={data.corsTitleId} className="col-3">
                                    <button
                                        className={`btn btn-warning btn-custom ${
                                            selectedTitleText === data.title ? "btn-active" : ""
                                        }`}
                                        onClick={() => selectTitle(data.title)}
                                    >
                                        {data.title}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="table-container">
                <table className="race-table">
                    <thead>
                    <tr>
                        {selectedCorsTitle.cors
                            .sort((a, b) => a.period - b.period)
                            .map((cors) => (
                                <th key={cors.corsId}>Round {cors.period}</th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from(new Set(
                        selectedCorsTitle.cors.flatMap(cors =>
                            cors.corsHorses.map(horse => horse.position)
                        )
                    ))
                        .sort((a, b) => a - b)
                        .map(position => (
                            <tr key={position}>
                                {selectedCorsTitle.cors
                                    .sort((a, b) => a.period - b.period)
                                    .map(cors => {
                                        const horses = cors.corsHorses
                                            .filter(horse => horse.position === position)
                                            .sort((a, b) => a.corsHorseId - b.corsHorseId);

                                        return (
                                            <td
                                                key={`${cors.corsId}-${position}`}
                                                className="horse-cell"
                                            >
                                                {horses.map(horse => (
                                                    <div
                                                        key={horse.corsHorseId}
                                                        onClick={() => toggleSelection(cors.corsId, horse.corsHorseId)}
                                                        className={`horse-name ${
                                                            selectedHorses[cors.corsId] === horse.corsHorseId ? 'selected' : ''
                                                        }`}
                                                    >
                                                        {horse.name}
                                                    </div>
                                                ))}
                                                {horses.length === 0 && (
                                                    <span className="empty-cell">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
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
