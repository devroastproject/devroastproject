import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProjectPage from "./components/Project/ProjectPage";
import React, { useEffect, useState } from "react";
import ProjectForm from "./components/Project/ProjectForm";
import UserContext from './context/UserContext';
import ProjectList from "./components/Project/ProjectList";
import Profile from "./components/Profile";
import { logOut } from "./services/logout";
import { callApi } from "./services/callAPI";
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
    if (!user.token){ // check if token is in local storage
      let userToken = localStorage.getItem("user_token")
      let tokenTime = localStorage.getItem("token_time")
      if (userToken && tokenTime) {
        let timeDiff = 30  //                              <----------  time in minutes until token expires
        let expired = (Date.now() - timeDiff*60000) > tokenTime
        if (!expired){
          setUser({...user, token: userToken}) 
        }
        else {
          logOut(user, setUser)
        }
      }
    }
  },[user])

  useEffect(() => {
    if (user.token && !user.info) {   // trigger api call if the token has been retrieved, but if the user has not been fetched
      (async () => {
        const userinfo = await callApi("users/me/", "GET", null, user.token)
        setUser({...user, info: userinfo})
      })()
    }
   }, [user])              // trigger effect if user is modified
  
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
            <Route exact path="/" component={ProjectList} />
            <Route path="/addproject" component={user.token ? ProjectForm : Login} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={user.token ? Profile : Login}/>
            <Route path="/project/:id" component={ProjectPage}/>
          </Switch>
        </div>
        </UserContext.Provider>
    </Router>

  );
}

export default App;
