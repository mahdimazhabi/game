import React, { useState, useEffect } from "react";
import "./MorseGame.css";

const MorseGame = () => {
    const [morseCode, setMorseCode] = useState("");
    const [decodedMessage, setDecodedMessage] = useState("");
    const [morseStartTime, setMorseStartTime] = useState(null);
    
    const morseMap = {
        ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
        "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
        "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
        ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
        "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y", "--..": "Z"
    };

    const startMorse = () => {
        setMorseStartTime(Date.now());
    };

    const endMorse = () => {
        if (!morseStartTime) return;
        let duration = Date.now() - morseStartTime;
        setMorseCode(prev => prev + (duration < 300 ? "." : "-"));
        setMorseStartTime(null);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (morseCode) {
                if (morseMap[morseCode]) {
                    setDecodedMessage(prev => prev + morseMap[morseCode]);
                } else {
                    alert("کد مورس اشتباه است!");
                }
                setMorseCode("");
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [morseCode]);

    return (
        <div className="morse-container">
            <div className="morse-decoded-message">حرف: {decodedMessage}</div>
            <div className="morse-code">{morseCode}</div>
            <div className="morse-circle" onMouseDown={startMorse} onMouseUp={endMorse}>
            </div>
        </div>
    );
};

export default MorseGame;