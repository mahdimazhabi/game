import "./topuser.css";

const UserProfile = () => {
  return (
    <div className="App">
      <header>
        <div className="user-info">
          <div className="profile-box">
            <span className="user-name">Username</span>
          </div>
          <span>Total Points: 1200</span>
        </div>
      </header>
      <div className="referral-link">
        <h2>Get Referral Link</h2>
        <button className="get-link">Get Link</button>
        <input
          type="text"
          placeholder="Referral Link"
          value="your-referral-link.com"
          readOnly
        />
        <button className="copy-button">Copy</button>
      </div>
      <div className="container">
        <div className="box" id="referral-box">
          <h2 className="glowing-text">Top 5 Referral Users</h2>
          <ul>
            <li>
              <img src="sticker1.png" alt="Sticker 1" className="sticker" />{" "}
              User 1: 10 referrals
            </li>
            <li>
              <img src="sticker2.png" alt="Sticker 2" className="sticker" />{" "}
              User 2: 9 referrals
            </li>
            <li className="glowing-text">User 3: 7 referrals</li>
            <li className="glowing-text">User 4: 5 referrals</li>
            <li className="glowing-text">User 5: 3 referrals</li>
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>
        <div className="box" id="football-box">
          <h2 className="glowing-text">Top 5 Football League Users</h2>
          <ul>
            <li className="glowing-text">
              <img src="userA.png" alt="User A" /> User A: 150 points
            </li>
            <li className="glowing-text">
              <img src="userB.png" alt="User B" /> User B: 140 points
            </li>
            <li className="glowing-text">
              <img src="userC.png" alt="User C" /> User C: 130 points
            </li>
            <li className="glowing-text">
              <img src="userD.png" alt="User D" /> User D: 120 points
            </li>
            <li className="glowing-text">
              <img src="userE.png" alt="User E" /> User E: 110 points
            </li>
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>
        <div className="box" id="horses-box">
          <h2 className="glowing-text">Top 5 Horse Racing League Users</h2>
          <ul>
            <li className="glowing-text">
              <img src="userI.png" alt="User I" /> User I: 200 points
            </li>
            <li className="glowing-text">
              <img src="userII.png" alt="User II" /> User II: 190 points
            </li>
            <li className="glowing-text">
              <img src="userIII.png" alt="User III" /> User III: 180 points
            </li>
            <li className="glowing-text">
              <img src="userIV.png" alt="User IV" /> User IV: 170 points
            </li>
            <li className="glowing-text">
              <img src="userV.png" alt="User V" /> User V: 160 points
            </li>
          </ul>
          <div className="scroll-bar">[Scroll Bar]</div>
        </div>
      </div>
      <footer>
        <button className="logout">Logout</button>
      </footer>
    </div>
  );
};

export default UserProfile;
