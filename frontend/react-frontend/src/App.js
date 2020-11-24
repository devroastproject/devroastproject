import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserContext from './context/UserContext'
import Login from "./components/Login";
import Nav from "./components/Nav";

function App() {
  
  // user state
  const [user, setUser] = useState({
    token: null,
    info: null
  })
  
  useEffect(() => {
    if (user.token && !user.info) {   // trigger api call if the token has been retrieved, but if the user has not been fetched
      (async () => {
        let userinfo = await fetch("http://localhost:8000/api/users/me", { // api call to current user
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': user.token}, 
          })
        .then(r =>{if (r.status === 200){return r.json()}}) // save info if request was good
        .catch(e => console.log(e))
        setUser({...user, info: userinfo})
      })()
    }}, [user]);              // trigger effect if user is modified

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>  {/* user data provided as context to whole app */}
        <div className="App">
          <Nav/>
          <Switch>
              <Route exact path="/" render={() => <h1>HOME</h1>} />
              <Route
                path="/login"
                component={Login}
              />
            </Switch>
        </div>
        </UserContext.Provider>
    </Router>

  );
}

export default App;
