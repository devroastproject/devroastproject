import UserContext from "../context/UserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const {user, setUser} = useContext(UserContext)
  return (
    <nav>
      <h2>DevRoast</h2>
      <ul>
        <Link to="/"> <li>Home</li> </Link>
        {user.info ? // if logged in 
        <>
          <Link to="/profile"> <li>{user.info.username} is Logged In </li> </Link> {/* render user name */}
          <Link to="/"> <li id="logout" onClick={() => setUser({...user, token: null, info: null})}> Log Out </li> </Link> {/* render logout button, resets user state */}
        </>
        : <Link to="/login"> <li id ="login">Log In</li> </Link> }
      </ul>
    </nav>
  );
};

export default Nav;