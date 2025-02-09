import { useState } from "react";
import "./champions.css";

const Champions = () => {
  const [results, setResults] = useState({
    match1: "",
    match2: "",
    match3: "",
    match4: "",
    match5: "",
    match6: "",
    match7: "",
    match8: "",
  });

  const [finalWinner, setFinalWinner] = useState("");

  const calculateResults = () => {
    const winners = {
      match1: document.getElementById("match1-winner").value,
      match2: document.getElementById("match2-winner").value,
      match3: document.getElementById("match3-winner").value,
      match4: document.getElementById("match4-winner").value,
      match5: document.getElementById("match5-winner").value,
      match6: document.getElementById("match6-winner").value,
      match7: document.getElementById("match7-winner").value,
      match8: document.getElementById("match8-winner").value,
    };

    setResults(winners);
    const final = winners.match1; // You can add your logic for final winner selection
    setFinalWinner(final);
  };

  return (
    <div className="container3">
      <h1>جدول درختی مسابقات فوتبال - رفت و برگشت</h1>
      <a href="index.html" className="back-btn">
        بازگشت به صفحه اصلی
      </a>
      <div className="bracket">
        {/* Round 1 */}
        <div className="round">
          {["A", "B", "C", "D", "E", "F", "G", "H"].map((team, index) => (
            <div className="match" key={index}>
              <label>{`تیم ${team} vs تیم ${String.fromCharCode(
                65 + index + 1
              )}`}</label>
              <select id={`match${index + 1}-raft`} required>
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <select id={`match${index + 1}-bargasht`} required>
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <label>تیم صعود کننده:</label>
              <select id={`match${index + 1}-winner`} required>
                <option value="">انتخاب کنید</option>
                <option value={`تیم ${team}`}>{`تیم ${team}`}</option>
                <option
                  value={`تیم ${String.fromCharCode(65 + index + 1)}`}
                >{`تیم ${String.fromCharCode(65 + index + 1)}`}</option>
              </select>
            </div>
          ))}
        </div>

        {/* Round 2 */}
        <div className="round">
          {["I", "J", "K", "L", "M", "N", "O", "P"].map((team, index) => (
            <div className="match" key={index}>
              <label>{`تیم ${team} vs تیم ${String.fromCharCode(
                73 + index + 1
              )}`}</label>
              <select id={`match${index + 5}-raft`} required>
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <select id={`match${index + 5}-bargasht`} required>
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <label>تیم صعود کننده:</label>
              <select id={`match${index + 5}-winner`} required>
                <option value="">انتخاب کنید</option>
                <option value={`تیم ${team}`}>{`تیم ${team}`}</option>
                <option
                  value={`تیم ${String.fromCharCode(73 + index + 1)}`}
                >{`تیم ${String.fromCharCode(73 + index + 1)}`}</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <button onClick={calculateResults}>محاسبه نتایج و تیم صعود کننده</button>
      <div id="result">
        <h2>نتایج:</h2>
        <ul>
          {Object.entries(results).map(([match, winner]) => (
            <li key={match}>
              {match}: {winner}
            </li>
          ))}
        </ul>
      </div>

      <h2>صعود کننده نهایی</h2>
      <div id="final-winner">{finalWinner}</div>
    </div>
  );
};

export default Champions;
