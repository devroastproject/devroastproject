import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProjectPage from "./components/ProjectPage";
import React, { useEffect, useState } from "react";
import UserContext from './context/UserContext';
import Projects from "./components/Projects";
import Profile from "./components/Profile";
import { callApi } from "./services/api";
import Login from "./components/Login";
import Nav from "./components/Nav";

function App() {
  
  // user state
  const [user, setUser] = useState({
    token: null,
    info: null,
    message: null
  })
  
  // get user info with token
  useEffect(() => {
    if (user.token && !user.info) {   // trigger api call if the token has been retrieved, but if the user has not been fetched
      (async () => {
        const userinfo = await callApi("users/me", "GET", null, user.token)
        setUser({...user, info: userinfo})
      })()
    }}, [user]);              // trigger effect if user is modified
  
  // time out user messages
  useEffect(() => {
    if (user.message){
      setTimeout(() => {setUser({...user, message: null})}, 5000)
    }
  }, [user])

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>  {/*user data provided as context to whole app*/}
        <div className="App">
          {user.message ? user.message : null}
          <Nav/>
          <Switch>
            <Route exact path="/" component={Projects} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile}/>
            <Route path="/project/:id" component={ProjectPage}/>
          </Switch>
        </div>
        </UserContext.Provider>
    </Router>

  );
}

export default App;
