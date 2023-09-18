// Third-party
import { Link } from "react-router-dom";

// Styling
import "./css/footer.css";

function Footer() {
  return (
    <footer>
      <p>Copyright &copy; 2023</p>
      <Link to="/about">About</Link>
    </footer>
  );
}

export default Footer;
