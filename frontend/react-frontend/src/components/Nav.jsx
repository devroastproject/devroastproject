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
        <Link to="/"> <li>Home</li> </Link>
        {user.info ? // if logged in 
        <>
          <li>{user.info.username} is Logged In </li> {/* render user name */}
          <Link to="/"> <li onClick={() => setUser({...user, key: null, info: null})}> Log Out </li> </Link> {/* render logout button, resets user state */}
        </>
        : <Link to="/login"> <li>Log In</li> </Link> }
      </ul>
    </nav>
  );
};

export default Nav;