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
        {user['key'] ? 
        <>
          <li>{user['key']} is Logged In </li> 
          <Link to="/"> <li onClick={() => setUser({...user, 'key':null})}> Log Out </li> </Link> 
        </>
        : <Link to="/login"> <li>Log In</li> </Link> }
      </ul>
    </nav>
  );
};

export default Nav;