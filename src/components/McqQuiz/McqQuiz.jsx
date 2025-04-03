import {useState, useEffect} from "react";
import axios from "axios";
import useUserId from "../../hook/useUserId ";
import "./McqQuiz.css";

const API_URL =
    "http://217.154.71.28/api/RequestQuestionAnswers/Add";
const START_GAME_URL =
    "http://217.154.71.28/api/UserQuestionAnswers/Add";
const UPDATE_ANSWER_URL =
    "http://217.154.71.28/api/UserQuestionAnswers/Edit";

const McqQuiz = () => {
    const [userId, setUserId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [isMatched, setIsMatched] = useState(false);
    const [registrationId, setRegistrationId] = useState(null); //Later usage
    const [isPollingComplete, setIsPollingComplete] = useState(false);
    const [players, setPlayers] = useState({userIdOne: null, userIdTwo: null});
    const [userQuestionAnswerId, setUserQuestionAnswerId] = useState(null);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(10);

    const UserId_Query = useUserId();
    const questions = [
        {
            questionId: 1,
            questionText: "What is the capital of France?",
            options: [
                {optionId: "A", text: "Paris"},
                {optionId: "B", text: "Berlin"},
                {optionId: "C", text: "Rome"},
                {optionId: "D", text: "Madrid"},
            ],
        },
        {
            questionId: 2,
            questionText: "Which planet is known as the Red Planet?",
            options: [
                {optionId: "A", text: "Earth"},
                {optionId: "B", text: "Mars"},
                {optionId: "C", text: "Jupiter"},
                {optionId: "D", text: "Saturn"},
            ],
        },
    ];

    useEffect(() => {
        let storedUserId = sessionStorage.getItem("userId");
        if (!storedUserId) {
            storedUserId = UserId_Query;
            sessionStorage.setItem("userId", storedUserId);
        }
        const numericUserId = Number(storedUserId);
        setUserId(numericUserId);
        registerUser(numericUserId);
    }, []);

    useEffect(() => {
        let countdown;
        if (isMatched) {
            countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        return 10;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [isMatched, isGameFinished]);

    const registerUser = async (id) => {
        try {
            const response = await axios.post(API_URL, {
                userId: id,
                isOnline: 1,
                date: new Date().toISOString(),
            });

            console.log("Registered User:", response.data);
            if (response.data && response.data.data) {
                setRegistrationId(response.data.data.requestQuestionAnswerId);
                startLongPolling(id, response.data.data.requestQuestionAnswerId);
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const startLongPolling = async (id, requestId) => {
        if (isMatched || isPollingComplete) return;

        try {
            const response = await axios.post(API_URL, {
                userId: id,
                isOnline: 1,
                date: new Date().toISOString(),
                requestQuestionAnswerId: requestId,
            });

            if (
                response.data.isSuccess &&
                response.data.data.status === "Now You can Play"
            ) {
                const data = response.data.data;
                setRoomId(data.requestQuestionAnswerId);
                setIsMatched(true);
                setIsPollingComplete(true);

                setPlayers({userIdOne: data.userIdOne, userIdTwo: data.userIdTwo});

                startGame(data.userIdOne, data.userIdTwo);

                stopLongPolling();
            } else {
                setTimeout(() => startLongPolling(id, requestId), 3000);
            }
        } catch (error) {
            console.error("Long polling error:", error);
            setTimeout(() => startLongPolling(id, requestId), 6000);
        }
    };

    const startGame = async (userOneId, userTwoId) => {
        try {
            const response = await axios.post(START_GAME_URL, {
                questionAnswerId: 1,
                correctOne: false,
                correctTwo: false,
                userOneId,
                userTwoId,
                date: new Date().toISOString(),
                time: new Date().toISOString().split("T")[1],
            });

            if (response.data.isSuccess) {
                console.log("Game started successfully!", response.data.data);

                setUserQuestionAnswerId(response.data.data.userQuestionAnswerId);

                console.log(
                    "Assigned userQuestionAnswerId:",
                    response.data.data.userQuestionAnswerId
                );
            } else {
                console.error("Failed to start game:", response.data.message);
            }
        } catch (error) {
            console.error("Error starting the game:", error);
        }
    };

    const stopLongPolling = () => {
        setIsPollingComplete(true);
    };

    const handleAnswerSelection = async (optionId) => {
        const selectedOption = optionId;
        const currentQuestion = questions[currentQuestionIndex];

        if (!userQuestionAnswerId) {
            console.error("userQuestionAnswerId is not set.");
            return;
        }

        const requestBody = {
            userQuestionAnswerId: userQuestionAnswerId,
            userId: userId,
            response: String(selectedOption),
            start: 1,
        };

        try {
            const response = await axios.put(UPDATE_ANSWER_URL, requestBody);
            console.log("User response sent:", response.data);

            if (response.data.isSuccess) {
                console.log("Response recorded successfully.");
            } else {
                console.error("Failed to record response:", response.data.message);
            }
        } catch (error) {
            console.error("Error sending user response:", error);
        }

        handleNextQuestion();
        setTimer(10);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => {
            if (prevIndex + 1 < questions.length) {
                return prevIndex + 1;
            } else {
                // Quiz is finished
                console.log("Quiz completed");
                setIsGameFinished(true);
                setIsMatched(false);
                setCurrentQuestionIndex(0);
                return prevIndex;
            }
        });
    };

    const resetGame = () => {
        setIsGameFinished(false);
        setIsMatched(false);
        setCurrentQuestionIndex(0);
        setTimer(10);
        setRoomId(null);
    };

    return (
        <div className="quiz-container">
            <button
                style={{
                    userSelect: "none",
                }}
                className="back-button"
                onClick={() => window.history.back()}>
                {'<'}
            </button>
            <div className="quiz-card">
                <div className="users-container">
                    <div className="user">User: {userId}</div>
                    <div className="user">
                        Opponent: {players.userIdTwo ? players.userIdTwo : "Waiting..."}
                    </div>
                    {" "}
                </div>
                {" "}
                <div className="room-info">
                    Room: {roomId ? roomId : "Searching..."}
                </div>
                {isMatched ? (
                    <>
                        <div className="question-text">
                            {" "}
                            <h2>
                                Question {currentQuestionIndex + 1} of {questions.length}
                            </h2>
                            {questions[currentQuestionIndex].questionText}
                        </div>
                        <div className="options-container">
                            {questions[currentQuestionIndex].options.map((option) => (
                                <button
                                    key={option.optionId}
                                    onClick={() => handleAnswerSelection(option.optionId)}
                                >
                                    {option.optionId}: {option.text}
                                </button>
                            ))}
                        </div>
                        <div className="timer">Time remaining: {timer} seconds</div>
                    </>
                ) : isGameFinished ? (
                    <>
                        <h2>The game has finished! Good luck!</h2>
                        <div className="play-again-container">
                            <button className="play-again-button" onClick={resetGame}>
                                Play Again
                            </button>
                        </div>
                    </>
                ) : (
                    <h2>Waiting for another player...</h2>
                )}
            </div>
        </div>
    );
};

export default McqQuiz;
