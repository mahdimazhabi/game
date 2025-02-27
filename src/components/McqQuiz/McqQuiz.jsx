import { useState, useEffect } from "react";
import "./McqQuiz.css";

const McqQuiz = () => {
  const questions = [
    {
      text: "بزرگ‌ترین سیاره منظومه شمسی کدام است؟",
      options: ["زمین", "مریخ", "مشتری", "زحل"],
      answer: "مشتری",
    },
    {
      text: "پایتخت ایران کدام است؟",
      options: ["تهران", "اصفهان", "مشهد", "شیراز"],
      answer: "تهران",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(7);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0) {
      goToNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  });

  const handleOptionClick = (option) => {
    if (result) return;

    setSelectedOption(option);
    setResult(
      option === currentQuestion.answer ? "🎉 برنده شدید" : "😞 بازنده شدید"
    );
  };

  const goToNextQuestion = () => {
    setTimeout(() => {
      setCurrentQuestionIndex((prev) =>
        prev + 1 < questions.length ? prev + 1 : 0
      );
      resetQuizState();
    }, 1500);
  };

  const resetQuizState = () => {
    setSelectedOption(null);
    setResult(null);
    setTimeLeft(7);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="users-container">
          <div className="user">user1</div>
          <div className="user">user2</div>
        </div>
        <h2 className="quiz-question">{currentQuestion.text}</h2>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`form-check option-item ${
                result && selectedOption === option
                  ? option === currentQuestion.answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionClick(option)}
              style={{ pointerEvents: result ? "none" : "auto" }}
            >
              <label className="form-check-label">{option}</label>
            </div>
          ))}
        </div>
        {result && (
          <p
            className={`result-text ${
              result === "🎉 برنده شدید" ? "text-success" : "text-danger"
            }`}
          >
            {result}
          </p>
        )}
        <p className="timer"> {timeLeft}s</p>
        <div className="online">وضعیت آنلاین: آنلاین</div>
      </div>
    </div>
  );
};

export default McqQuiz;
