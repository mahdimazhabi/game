import "./top.css"; // فایل استایل جداگانه

const UserPage = () => {
  return (
    <div className="App">
      {/* User Info Section */}

      {/* Main Content Section */}
      <div className="">
        {/* Referral Box */}

        {/* Football Box */}
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

        {/* Horse Racing Box */}
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
      <div className="user-info1">
        <div className="profile-box1">
          <span className="user-name">Username</span>
        </div>
        <span>Total Points: 1200</span>
      </div>

      {/* Referral Link Section */}
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
    </div>
  );
};

export default UserPage;
