import React from "react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
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
    </Router>

  );
}

export default App;
