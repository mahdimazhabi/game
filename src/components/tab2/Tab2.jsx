import { Link } from "react-router-dom";
import "./Tab2.css";
const Tab2 = () => {
  return (
    <div>
      <h1>لطفاً لیگ مورد نظر خود را انتخاب کنید</h1>
      <div className="league-container">
        <div className="league-card">
          <Link to="/champions">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/UEFA_Champions_League_logo_2.svg/300px-UEFA_Champions_League_logo_2.svg.png"
              alt="لیگ قهرمانان اروپا"
            />
            <h2>لیگ قهرمانان اروپا</h2>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/europa">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/UEFA_Europa_League_logo.svg/300px-UEFA_Europa_League_logo.svg.png"
              alt="لیگ اروپا"
            />
            <h2>لیگ اروپا</h2>
          </Link>
        </div>

        <div className="league-card">
          <Link to="/conference">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/UEFA_Europa_Conference_League_logo.svg/300px-UEFA_Europa_Conference_League_logo.svg.png"
              alt="لیگ کنفرانس اروپا"
            />
            <h2>لیگ کنفرانس اروپا</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tab2;
