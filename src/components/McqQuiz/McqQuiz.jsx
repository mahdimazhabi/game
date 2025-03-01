import { useState, useEffect } from "react";
import axios from "axios";
import "./McqQuiz.css";

const API_URL = "http://217.154.71.28/api/RequestQuestionAnswers/Add";

const McqQuiz = () => {
  const [userId, setUserId] = useState(null);
  const [opponentId, setOpponentId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isPollingComplete, setIsPollingComplete] = useState(false);

  useEffect(() => {
    let storedUserId = sessionStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = Math.floor(Math.random() * 1000000).toString();
      sessionStorage.setItem("userId", storedUserId);
    }
    const numericUserId = Number(storedUserId);
    setUserId(numericUserId);
    registerUser(numericUserId);
  }, []);

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
    if (isMatched || isPollingComplete) return; // Stop polling if matched or polling complete
    setIsPolling(true);

    try {
      const response = await axios.post(API_URL, {
        userId: id,
        isOnline: 1,
        date: new Date().toISOString(),
        requestQuestionAnswerId: requestId,
      });

      console.log("Long Poll Response:", response.data);

      if (
        response.data.isSuccess &&
        response.data.data.status === "Now You can Play"
      ) {
        const data = response.data.data;
        const opponent =
          data.userIdOne === id ? data.userIdTwo : data.userIdOne;
        setOpponentId(opponent);
        setRoomId(data.requestQuestionAnswerId);
        setIsMatched(true);
        setIsPollingComplete(true);
      } else {
        console.log("No match found, retrying...");
        startLongPolling(id, requestId);
      }
    } catch (error) {
      console.error("Long polling error:", error);
      setTimeout(() => startLongPolling(id, requestId), 5000);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="users-container">
          <div className="user">User: {userId}</div>
          <div className="user">
            Opponent: {opponentId ? opponentId : "Waiting..."}
          </div>
        </div>
        {isMatched ? (
          <h2>Game is ready to start! Room ID: {roomId}</h2>
        ) : (
          <h2>Waiting for another player...</h2>
        )}
      </div>
    </div>
  );
};

export default McqQuiz;
