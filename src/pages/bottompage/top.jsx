import "./top.css"; // فایل استایل جداگانه
import { useEffect, useState } from "react";
import api from "../../api";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.post("/Users/GetById", { userId: 4 });

        if (response.data?.users?.length) {
          setUser(response.data.users[0]); // Assuming the response contains a `users` array
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const copyToClipboard = () => {
    if (user.referralLink) {
      navigator.clipboard.writeText(user.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset message after 2 seconds
    }
  };

  return (
    <div className="App">
      {/* User Info Section */}
      <header>
        <div className="user-info1">
          <div className="profile-box">
            <span className="user-name">{user.username || "Loading..."}</span>
          </div>
          <span>Total Points(Level): {user.level || 0}</span>
        </div>
      </header>

      {/* Referral Link Section */}
      <div className="referral-link">
        <h2>Get Referral Link</h2>
        <input type="text" value={user.referralLink || ""} readOnly />
        <button className="copy-button" onClick={copyToClipboard}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Main Content Section */}
      <div className="container">
        {/* Referral Box */}

        {/* Football Box */}
        <div className="box" id="football-box">
          <h2 className="glowing-text">Top 5 Football League Users</h2>
          <ul>
            {["A", "B", "C", "D", "E"].map((user, index) => (
              <li key={index} className="glowing-text">
                <img src={`user${user}.png`} alt={`User ${user}`} />
                User {user}: {150 - index * 10} points
              </li>
            ))}
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>

        {/* Horse Racing Box */}
        <div className="box" id="horses-box">
          <h2 className="glowing-text">Top 5 Horse Racing League Users</h2>
          <ul>
            {["I", "II", "III", "IV", "V"].map((user, index) => (
              <li key={index} className="glowing-text">
                <img src={`user${user}.png`} alt={`User ${user}`} />
                User {user}: {200 - index * 10} points
              </li>
            ))}
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
