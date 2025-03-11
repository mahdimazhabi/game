import "./top.css"; // Separate CSS file
import { useEffect, useState } from "react";
import api from "../../api";
import useUserId from "../../hook/useUserId ";
const UserPage = () => {
  const [user, setUser] = useState({});
  const [copied, setCopied] = useState(false);
  const [levelCoinCountId, setLevelCoinCountId] = useState(null);
  const [levelCoinData, setLevelCoinData] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const userId = useUserId();

  useEffect(() => {
    if (!userId) return;

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

    fetchUser();
    fetchLevelCoinCountId();
  }, [userId]);

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

  // Fetching top users independently of userId
  useEffect(() => {
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

    fetchTopUsers();
  }, []);

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

      {/* Top Users Section */}
      <div className="top-users-box">
        <h2 className="glowing-text">🏆 Top 5 Users</h2>
        <ul className="top-users-list">
          {topUsers.length > 0 ? (
            topUsers.map((user, index) => (
              <li key={index} className="top-users-item">
                <div className="user-info">
                  <img
                    src={`user${user.userId}.png`}
                    alt={`User ${user.userId}`}
                    className="user-avatar"
                  />
                  <div className="user-details">
                    <span className="user-name">User {user.userId}</span>
                    <span className="user-points">{user.points}-points</span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="loading-item">Loading...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
