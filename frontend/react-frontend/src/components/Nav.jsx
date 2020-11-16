import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Nav = () => {
  const {user, setUser} = useContext(UserContext)
  return (
    <nav>
      <h2>DevRoast</h2>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
          <li>{user['key']}</li>
      </ul>
    </nav>
  );
};

export default Nav;