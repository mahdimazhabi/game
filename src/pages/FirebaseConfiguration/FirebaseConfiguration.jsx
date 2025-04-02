import {useState, useEffect} from "react";
import "./FirebaseConfiguration.css";
import useDoozApi from "../../api/DoozAPI/Dooz.jsx";
import useDoozeRequestApi from "../../api/DoozAPI/DoozRequest.jsx";

const FirebaseConfiguration = () => {
    const [doozId, setDoozId] = useState(null);
    const [game, setGame] = useState(
        {
            "doozId": null,
            "userIdOne": null,
            "userIdTwo": null,
            "result": null,
            "oneHome": null,
            "twoHome": null,
            "threeHome": null,
            "fourHome": null,
            "fiveHome": null,
            "sixHome": null,
            "sevenHome": null,
            "eightHome": null,
            "nineHome": null,
            "turn": null,
            "start": null
        }
    )
    const [currentPlayer, setCurrentPlayer] = useState();
    const [gameState, setGameState] = useState(Array(9).fill(null)); // وضعیت بازی
    const [status, setStatus] = useState("Searching for opponent...");

    const checkUserTurn = () => {
        console.log(game);
        console.log(parseInt(localStorage.getItem("userId")));
        if (game.userIdOne === parseInt(localStorage.getItem("userId"))) {
            return game.turn === 0;
        } else {
            return game.turn === 1;
        }
    }

    const handleCellClick = async (index) => {
        if (gameState[index] === 0  && checkUserTurn() && game.result === 0) {
            const newGameState = [...gameState];
            newGameState[index] = currentPlayer;
            const newTurn = currentPlayer === 1 ? 1 : 0
            const {editDooz} = useDoozApi()
            await editDooz({
                doozId: doozId,
                oneHome: newGameState[0],
                twoHome: newGameState[1],
                threeHome: newGameState[2],
                fourHome: newGameState[3],
                fiveHome: newGameState[4],
                sixHome: newGameState[5],
                sevenHome: newGameState[6],
                eightHome: newGameState[7],
                nineHome: newGameState[8],
                turn: newTurn
            })
            await getDoozGame()
        }
    };

    const getDoozGame = async () => {
        console.log("dooz id", doozId);
        if (doozId) {
            const {getDoozsById} = useDoozApi()
            const doozGame = await getDoozsById({
                doozId: doozId,
            })
            setGame(doozGame.doozes[0])
            setGameState([
                doozGame.doozes[0].oneHome,
                doozGame.doozes[0].twoHome,
                doozGame.doozes[0].threeHome,
                doozGame.doozes[0].fourHome,
                doozGame.doozes[0].fiveHome,
                doozGame.doozes[0].sixHome,
                doozGame.doozes[0].sevenHome,
                doozGame.doozes[0].eightHome,
                doozGame.doozes[0].nineHome
            ])
            const userNumber = doozGame.doozes[0].userIdOne === parseInt(localStorage.getItem("userId")) ? 1 : 2
            setCurrentPlayer(userNumber)
            if (doozGame.doozes[0].turn === userNumber - 1) {
                setStatus("Your turn")
            } else {
                setStatus("Waiting for opponent...")
            }
            if (doozGame.doozes[0].result !== 0) {
                if (currentPlayer === doozGame.doozes[0].result) {
                    setStatus("You Win!")
                } else {
                    setStatus("Opponent Win!")
                }
            }
        }
    }
    const cancelRequest = async () => {
        if (localStorage.getItem("addDoozRequestId")) {
            const {editDoozRequest, closeDoozRequest} = useDoozRequestApi()
            await editDoozRequest({
                doozRequestId: localStorage.getItem("addDoozRequestId"),
                userId: parseInt(localStorage.getItem("userId")),
                isOnline: 0
            })
            const date = new Date();
            await closeDoozRequest({
                doozRequestId: localStorage.getItem("addDoozRequestId"),
                userId: parseInt(localStorage.getItem("userId")),
                date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
            })
            localStorage.removeItem("addDoozRequestId")
            setDoozId(null)
            setGameState(Array(9).fill(null))
            setCurrentPlayer(null)
            setGame(null)
        }
    }
    const addGame = async (userIdTwo) => {
        const {addDooz} = useDoozApi()
        const date = new Date();
        if (!doozId) {
            const doozGame = await addDooz({
                userIdOne: parseInt(localStorage.getItem("userId")),
                userIdTwo: userIdTwo,
                date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
                turn: 0,
                time: "00:00:00",
            })
            console.log('delivered dooz id', doozGame.data.doozId)
            setDoozId(doozGame.data.doozId)
        }
    }

    useEffect(() => {
        getDoozGame().then()
    }, [doozId]);
    useEffect(() => {
        const intervalId = setInterval(getDoozGame, 15000); // 15 seconds interval
        return () => clearInterval(intervalId);
    }, [doozId]);

    useEffect(() => {
        setStatus("Searching for opponent...");
        let intervalId;
        const requestGame = async () => {
            const {addDoozRequest} = useDoozeRequestApi()
            const date = new Date();
            const addRequestResult = await addDoozRequest({
                userId: parseInt(localStorage.getItem('userId')),
                isOnline: 1,
                date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
            })
            addRequestResult ? localStorage.setItem("addDoozRequestId", addRequestResult.data.doozRequestId) : null;
            if (addRequestResult?.data.userIdTwo) {
                setStatus("Opponent found!")
                addGame(addRequestResult.data.userIdTwo).then()
                getDoozGame().then()
                clearInterval(intervalId)
            }
        }
        requestGame();
        intervalId = setInterval(requestGame, 3000);
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            cancelRequest().then()
            const confirmationMessage = "Are you sure you want to leave?";
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    return (
        <div>
            <button
                style={{
                    userSelect: "none",
                }}
                className="back-button"
                onClick={() => window.history.back()}>
                {'<'}
            </button>
            <h1>بازی آنلاین دوز</h1>
            <div id="status">{status}</div>
            <div id="game-board">
                {gameState.map((cell, index) => (
                    <div
                        key={index}
                        className={`cell ${
                            cell === 1 ? "blue" : cell === 2 ? "red" : ""
                        }`}
                        onClick={() => handleCellClick(index)}
                    >
                        {cell === 1 ? "O" : cell === 2 ? "X" : ""}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FirebaseConfiguration;
