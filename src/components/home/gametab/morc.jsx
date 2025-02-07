import React, { useState } from "react";

const morseCode = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", "0": "-----", "1": ".----", "2": "..---",
  "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...",
  "8": "---..", "9": "----.", ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "'": ".----.", "/": "-..-.", "(": "-.--.", ")": "-.--.-", "&": ".-...",
  ":": "---...", ";": "-.-.-.", "=": "-...-", "+": ".-.-.", "-": "-....-",
  "_": "..--.-", "\"": ".-..-.", "$": "...-..-", "@": ".--.-."
};

const MorseGame = () => {
  const [inputText, setInputText] = useState("");
  const [morseText, setMorseText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  // تبدیل متن به کد مورس
  const toMorse = (text) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => morseCode[char] || " ")
      .join(" ");
  };

  // تبدیل کد مورس به متن
  const fromMorse = (morse) => {
    const reversedMorseCode = Object.fromEntries(
      Object.entries(morseCode).map(([key, value]) => [value, key])
    );

    return morse
      .split(" ")
      .map((code) => reversedMorseCode[code] || " ")
      .join("");
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setMorseText(toMorse(text));
    setDecodedText(fromMorse(morseText));
  };

  const handleMorseChange = (e) => {
    const morse = e.target.value;
    setDecodedText(fromMorse(morse));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#000", color: "#fff" }}>
      <h1>Morse Code Game</h1>

      {/* تبدیل متن به کد مورس */}
      <div>
        <h2>Convert Text to Morse Code</h2>
        <input
          type="text"
          placeholder="Enter text here"
          value={inputText}
          onChange={handleTextChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #fff",
            backgroundColor: "#333",
            color: "#fff",
          }}
        />
        <p>{morseText}</p>
      </div>

      {/* تبدیل کد مورس به متن */}
      <div>
        <h2>Convert Morse Code to Text</h2>
        <textarea
          placeholder="Enter Morse code here"
          value={morseText}
          onChange={handleMorseChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #fff",
            backgroundColor: "#333",
            color: "#fff",
            width: "300px",
            height: "100px",
          }}
        />
        <p>{decodedText}</p>
      </div>
    </div>
  );
};

export default MorseGame;
