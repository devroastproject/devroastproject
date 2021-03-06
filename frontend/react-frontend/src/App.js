import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserContext from './context/UserContext';
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
    if (!user.token){
      let userToken = localStorage.getItem("user_token")
      if (userToken){
        setUser({...user, token: userToken}) 
    }
    }
    if (user.token && !user.info) {   // trigger api call if the token has been retrieved, but if the user has not been fetched
      (async () => {
        const userinfo = await callApi("users/me", "GET", null, user.token)
        setUser({...user, info: userinfo})
      })()
    }}, [user.info, user.token]);              // trigger effect if user is modified
  
  // time out user messages
  useEffect(() => {
    if (user.message){
      setTimeout(() => {setUser({...user, message: null})}, 5000)
    }
  }, [user.message])

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>  {/*user data provided as context to whole app*/}
        <div className="App">
          {user.message ? user.message : null}
          <Nav/>
          <Switch>
              <Route exact path="/" render={() => <h1>HOME</h1>} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={Profile}/>
            </Switch>
        </div>
        </UserContext.Provider>
    </Router>

  );
}

export default App;
