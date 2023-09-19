// Third-party
import { Link } from "react-router-dom";

// Utils
import { APP_VERSION } from "../utils/constants";

// Styling
import "./css/about.css";

function About() {
  return (
    <div className="about">
      <h3>To-Do List Version {APP_VERSION}</h3>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default About;
