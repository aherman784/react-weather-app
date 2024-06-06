import { Link } from "react-router-dom";
import "./navigation-bar.css";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <Link to="/weather">
        <button>Weather</button>
      </Link>
      <Link to="/alerts">
        <button>Alerts</button>
      </Link>
    </nav>
  );
};

export default NavigationBar;