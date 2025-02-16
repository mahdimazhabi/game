import { Link } from "react-router-dom";
import "./Tab2.css";
const Tab2 = () => {
  return (
    <div>
      <h1>لطفاً لیگ مورد نظر خود را انتخاب کنید</h1>
      <div className="league-container">
        <div className="league-card">
          <Link to="/champions">
            <span>لیگ قهرمانان اروپا</span>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/europa">
            <span>لیگ اروپا</span>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/conference">
            <span>لیگ کنفرانس اروپا</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
