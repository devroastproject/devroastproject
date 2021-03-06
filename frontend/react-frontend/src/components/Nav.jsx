import UserContext from "../context/UserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../services/logout";

const Nav = () => {
  const {user, setUser} = useContext(UserContext)
  return (
    <nav>
      <Link to="/"> <h2>DevRoast</h2> </Link>
      <ul>
        {user.info ? // if logged in 
        <>
          <Link to="/addproject"><li>Add New Project</li></Link>
          <Link to="/profile"> <li>{user.info.username} is Logged In </li> </Link> {/* render user name */}
          <Link to="/"> <li id="logout" onClick={ () => logOut(user, setUser) }> Log Out </li> </Link> {/* render logout button, resets user state */}
        </>
        : <Link to="/login"> <li>Log In</li> </Link> }
      </ul>
    </nav>
  );
};

export default Nav;