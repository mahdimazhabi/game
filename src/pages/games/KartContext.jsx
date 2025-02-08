// import { useState } from "react";
// import { Card, CardContent, CardHeader } from "@shadcn/ui";
// import { Button } from "@shadcn/ui";
// import { AlertCircle, Gift } from "lucide-react";
// import { motion } from "framer-motion";

export default function RewardCard() {
  const validCodes = new Set(["1234567", "7654321", "1111111"]);
  const usedCodes = new Set(); // Used codes

  // Card data (100 cards)
  const cardsData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    image: `https://via.placeholder.com/150x200?text=Card+${i + 1}`,
    prize: `Prize ${i + 1}`,
  }));

  const loginContainer = document.getElementById("login-container");
  const cardContainer = document.getElementById("card-container");
  const cardsGrid = document.getElementById("cards-grid");
  let selectedCard = null; // Selected card

  // Check password
  function checkCode() {
    const inputCode = document.getElementById("code-input").value;
    if (validCodes.has(inputCode) && !usedCodes.has(inputCode)) {
      usedCodes.add(inputCode); // Register used code
      loginContainer.style.display = "none";
      cardContainer.style.display = "block";
      loadCards();
    } else {
      alert("Incorrect password or already used.");
    }
  }

  // Create cards
  function loadCards() {
    cardsData.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.innerHTML = `
              <img src="${card.image}" alt="Card ${card.id}">
              <div class="prize">${card.prize}</div>
          `;
      cardElement.addEventListener("click", () => {
        if (!selectedCard) {
          // If no card is selected
          selectedCard = card.id;
          cardElement.classList.add("active");
          disableAllCards(); // Disable all other cards
          alert(`Card ${card.id} selected! Your prize: ${card.prize}`);
        }
      });
      cardsGrid.appendChild(cardElement);
    });
  }

  // Disable all cards after selecting one
  function disableAllCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (!card.classList.contains("active")) {
        card.classList.add("disabled");
      }
    });
  }
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="login-container" id="login-container">
        <h2>Login to the System</h2>
        <input
          type="text"
          id="code-input"
          placeholder="Enter the 7-digit password"
          maxLength={7}
        />
        <button onClick={checkCode}>Login</button>
      </div>
      <div className="card-container" id="card-container">
        {/* <h1>Select a Card</h1> */}
        <div id="cards-grid"></div>
      </div>
    </div>
  );
}
