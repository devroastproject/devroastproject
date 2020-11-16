import React, { useState } from "react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from './context/UserContext'

function App() {
  
  const [user, setUser] = useState({'key': null})

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
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
