import "./top.css"; // Separate CSS file
import { useEffect, useState } from "react";
import api from "../../api";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [copied, setCopied] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [levelCoinCountId, setLevelCoinCountId] = useState(null);
  const [levelCoinData, setLevelCoinData] = useState(null);
  const userId = 4; // Hardcoded userId for now

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.post("/Users/GetById", { userId });

        if (response.data?.users?.length) {
          setUser(response.data.users[0]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchLevelCoinCountId = async () => {
      try {
        const response = await api.post("/LevelCoinCounts/GetAll");
        if (response.data?.levelCoinCounts) {
          const userLevelCoin = response.data.levelCoinCounts.find(
            (item) => item.userId === userId
          );
          if (userLevelCoin) {
            setLevelCoinCountId(userLevelCoin.levelCoinCountId);
          }
        }
      } catch (error) {
        console.error("Error fetching level coin count ID:", error);
      }
    };

    const fetchTopUsers = async () => {
      try {
        const response = await api.post("/LevelCoinCounts/GetAll");
        if (response.data?.levelCoinCounts) {
          const userPoints = response.data.levelCoinCounts.reduce(
            (acc, item) => {
              if (item.userId !== 0) {
                acc[item.userId] = (acc[item.userId] || 0) + item.count;
              }
              return acc;
            },
            {}
          );

          const sortedUsers = Object.entries(userPoints)
            .map(([id, points]) => ({ userId: Number(id), points }))
            .sort((a, b) => b.points - a.points)
            .slice(0, 5);

          setTopUsers(sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchUser();
    fetchLevelCoinCountId();
    fetchTopUsers();
  }, []);

  useEffect(() => {
    if (levelCoinCountId) {
      const fetchLevelCoinData = async () => {
        try {
          const response = await api.post("/LevelCoinCounts/GetById", {
            levelCoinCountId,
          });
          if (response.data) {
            setLevelCoinData(response.data);
          }
        } catch (error) {
          console.error("Error fetching level coin data:", error);
        }
      };

      fetchLevelCoinData();
    }
  }, [levelCoinCountId]);

  const copyToClipboard = () => {
    if (user.referralLink) {
      navigator.clipboard.writeText(user.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          <span>
            {levelCoinData ? (
              <ul>
                {Array.isArray(levelCoinData.levelCoinCounts) &&
                  levelCoinData.levelCoinCounts.map((item, index) => (
                    <li key={index} className="glowing-text">
                      Total Points: {item.count}
                    </li>
                  ))}
              </ul>
            ) : (
              <li>Loading...</li>
            )}
          </span>
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
        {/* Football Box */}
        <div className="box" id="football-box">
          <h2 className="glowing-text">Top 5 Users</h2>
          <ul>
            {topUsers.length > 0 ? (
              topUsers.map((user, index) => (
                <li key={index} className="glowing-text">
                  <img
                    src={`user${user.userId}.png`}
                    alt={`User ${user.userId}`}
                  />
                  User {user.userId}: {user.points} points
                </li>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
