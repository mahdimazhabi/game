import { useState } from "react";
import "./Europa.css";
const Europa = () => {
  function calculateResults() {
    const results = [];
    const winners = []; // آرایه‌ای برای ذخیره تیم‌های صعود کننده
    let allSelected = true;

    for (let i = 1; i <= 8; i++) {
      const raft = document.getElementById(`match${i}-raft`).value;
      const bargasht = document.getElementById(`match${i}-bargasht`).value;
      const winner = document.getElementById(`match${i}-winner`).value; // تیم صعود کننده دستی

      if (!raft || !bargasht || !winner) {
        allSelected = false;
        alert(`لطفا تمام انتخاب‌های مربوط به مسابقه ${i} را تکمیل کنید.`);
        return;
      }

      const team1 = `تیم ${String.fromCharCode(64 + i * 2 - 1)}`; // تیم A, C, E, ...
      const team2 = `تیم ${String.fromCharCode(64 + i * 2)}`; // تیم B, D, F, ...

      // محاسبه امتیازات
      let team1Score = 0;
      let team2Score = 0;

      // مرحله رفت
      if (raft === "برنده تیم 1") team1Score += 3;
      else if (raft === "برنده تیم 2") team2Score += 3;
      else if (raft === "مساوی") {
        team1Score += 1;
        team2Score += 1;
      }

      // مرحله برگشت
      if (bargasht === "برنده تیم 1") team1Score += 3;
      else if (bargasht === "برنده تیم 2") team2Score += 3;
      else if (bargasht === "مساوی") {
        team1Score += 1;
        team2Score += 1;
      }

      // تعیین تیم صعود کننده
      results.push({
        match: `${team1} vs ${team2}`,
        raft: raft,
        bargasht: bargasht,
        team1Score: team1Score,
        team2Score: team2Score,
        winner: winner, // استفاده از تیم صعود کننده دستی
      });

      // ذخیره صعود کننده
      winners.push(winner);
    }

    if (!allSelected) {
      alert("لطفا تمام انتخاب‌ها را تکمیل کنید.");
      return;
    }

    // نمایش نتایج
    const resultDiv = document.getElementById("result");
    let resultText = "<h2>نتایج نهایی:</h2>";
    results.forEach((result) => {
      resultText += `
                <p>
                    ${result.match}:
                    <br>رفت: ${result.raft}
                    <br>برگشت: ${result.bargasht}
                    <br>امتیاز ${result.match.split(" vs ")[0]}: ${
        result.team1Score
      }
                    <br>امتیاز ${result.match.split(" vs ")[1]}: ${
        result.team2Score
      }
                    <br>تیم صعود کننده: ${result.winner}
                </p>
            `;
    });
    resultDiv.innerHTML = resultText;

    // محاسبه صعود کننده نهایی
    const finalWinner = calculateFinalResults(winners);
    const finalWinnerDiv = document.getElementById("final-winner");
    finalWinnerDiv.innerHTML = `<strong>تیم صعود کننده نهایی: ${finalWinner}</strong>`;
  }

  function calculateFinalResults(winners) {
    const semiFinalWinners = [];

    // اولین نیمه‌نهایی
    semiFinalWinners.push(determineWinner(winners[0], winners[1])); // برنده مسابقه 1
    semiFinalWinners.push(determineWinner(winners[2], winners[3])); // برنده مسابقه 2
    semiFinalWinners.push(determineWinner(winners[4], winners[5])); // برنده مسابقه 3
    semiFinalWinners.push(determineWinner(winners[6], winners[7])); // برنده مسابقه 4

    // تعیین برنده فینال
    const finalWinner = determineWinner(
      semiFinalWinners[0],
      semiFinalWinners[1]
    );
    return finalWinner;
  }

  function determineWinner(team1, team2) {
    if (team1 === team2) {
      return "مساوی (نیاز به قرعه‌کشی)";
    }
    // فرض بر این است که تیم اول برنده می‌شود
    return team1;
  }
  const [results, setResults] = useState({
    match1Raft: "",
    match1Bargasht: "",
    match1Winner: "",
    match2Raft: "",
    match2Bargasht: "",
    match2Winner: "",
    match3Raft: "",
    match3Bargasht: "",
    match3Winner: "",
    match4Raft: "",
    match4Bargasht: "",
    match4Winner: "",
    match5Raft: "",
    match5Bargasht: "",
    match5Winner: "",
    match6Raft: "",
    match6Bargasht: "",
    match6Winner: "",
    match7Raft: "",
    match7Bargasht: "",
    match7Winner: "",
    match8Raft: "",
    match8Bargasht: "",
    match8Winner: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setResults((prevResults) => ({
      ...prevResults,
      [id]: value,
    }));
  };

  return (
    <div className="container">
      <h1>جدول درختی مسابقات فوتبال - رفت و برگشت</h1>
      <a href="index.html" className="back-btn">
        بازگشت به صفحه اصلی
      </a>
      <div className="bracket">
        {/* Round 1 */}
        <div className="round">
          {["match1", "match2", "match3", "match4"].map((match, index) => (
            <div className="match" key={index}>
              <label>
                {match === "match1"
                  ? "AS Roma vs FC Porto"
                  : match === "match2"
                  ? "Bayer Leverkusen vs Olympiacos"
                  : match === "match3"
                  ? "West Ham United vs Fenerbahçe"
                  : "Real Betis vs Galatasaray"}
              </label>
              <select
                id={`${match}-raft`}
                required
                value={results[`${match}Raft`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <select
                id={`${match}-bargasht`}
                required
                value={results[`${match}Bargasht`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <label>تیم صعود کننده:</label>
              <select
                id={`${match}-winner`}
                required
                value={results[`${match}Winner`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="AS Roma">AS Roma</option>
                <option value="FC Porto">FC Porto</option>
                <option value="Bayer Leverkusen">Bayer Leverkusen</option>
                <option value="Olympiacos">Olympiacos</option>
                <option value="West Ham United">West Ham United</option>
                <option value="Fenerbahçe">Fenerbahçe</option>
                <option value="Real Betis">Real Betis</option>
                <option value="Galatasaray">Galatasaray</option>
              </select>
            </div>
          ))}
        </div>

        {/* Round 2 */}
        <div className="round">
          {["match5", "match6", "match7", "match8"].map((match, index) => (
            <div className="match" key={index}>
              <label>
                {match === "match5"
                  ? "Sparta Prague vs Lille"
                  : match === "match6"
                  ? "Ajax vs Genk"
                  : match === "match7"
                  ? "Anderlecht vs Dinamo Zagreb"
                  : "Sporting Braga vs Union Berlin"}
              </label>
              <select
                id={`${match}-raft`}
                required
                value={results[`${match}Raft`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <select
                id={`${match}-bargasht`}
                required
                value={results[`${match}Bargasht`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="برنده تیم 1">برنده تیم 1</option>
                <option value="مساوی">مساوی</option>
                <option value="برنده تیم 2">برنده تیم 2</option>
              </select>
              <label>تیم صعود کننده:</label>
              <select
                id={`${match}-winner`}
                required
                value={results[`${match}Winner`]}
                onChange={handleChange}
              >
                <option value="">انتخاب کنید</option>
                <option value="Sparta Prague">Sparta Prague</option>
                <option value="Lille">Lille</option>
                <option value="Ajax">Ajax</option>
                <option value="Genk">Genk</option>
                <option value="Anderlecht">Anderlecht</option>
                <option value="Dinamo Zagreb">Dinamo Zagreb</option>
                <option value="Sporting Braga">Sporting Braga</option>
                <option value="Union Berlin">Union Berlin</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      <button onClick={calculateResults}>محاسبه نتایج و تیم صعود کننده</button>
      <div id="result"></div>
      <h2>صعود کننده نهایی</h2>
      <div id="final-winner"></div>
    </div>
  );
};

export default Europa;
