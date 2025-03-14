import { Link } from "react-router-dom";
import "./Tab2.css";

const Tab2 = () => {
  return (
    <div>
      <h1>Please select your desired league</h1>
      <div className="league-container">
        <div className="league-card">
          <Link to="/champions">
            <span>UEFA Champions League</span>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/europa">
            <span>UEFA Europa League</span>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/conference">
            <span>UEFA Europa Conference League</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
