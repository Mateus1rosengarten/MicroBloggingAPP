import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { TweetsAddContext } from "../context/contextAdd";

function Navbar() {
  const { userLog } = useContext(TweetsAddContext);

  return (
    <nav className="navbarstyle">
      <ul>
        <li className="firstitem">
          <Link to={userLog ? "/home" : "/"}> Home</Link>
        </li>
        <li className="seconditem">
          <Link to={userLog ? "/profile" : "/"}> Profile </Link>
        </li>
        <li className="thirditem">
          <Link to="/"> LogIn </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
