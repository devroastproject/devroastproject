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
import Grid from "@mui/material/Grid";


function App() {
  
  // user state
  const [user, setUser] = useState({
    token: null,
    info: null,
    message: null,
    tags: []
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
          window.location.reload(false) // reload page to log out
        }
      }
    }
  },[user])

  // trigger api call if the token has been retrieved, but if the user has not been fetched
  useEffect(() => {
    if (user.token && !user.info) {   
      (async () => {
        const userinfo = await callApi("users/me/", "GET", null, user.token)
        setUser({...user, info: userinfo})
      })()
    }
   }, [user])              // trigger effect if user is modified
  
  // collect all tags from API on load
  useEffect(() => {
    (async () => { 
      const res = await callApi('tags/', 'GET', null, user.token)
      setUser({...user, tags: res})
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // time out user messages
  useEffect(() => {
    if (user.message){
      const timer = setTimeout(() => {setUser({...user, message: null})}, 5000)
      return () => clearTimeout(timer)
    }
  }, [user])

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>  {/*user data provided as context to whole app*/}
        <div className="App">
          <Grid container>
            <Grid item xs={0} md={1} lg={2}></Grid>
            <Grid item xs={12} md={10} lg={8}>
              <Nav/>
              {user.message ? user.message : null}
              <Switch>
                <Route exact path="/" component={ProjectList} />
                <Route path="/addproject" component={user.token ? ProjectForm : Login} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={user.token ? Profile : Login}/>
                <Route path="/project/:id" component={ProjectPage}/>
              </Switch>
            </Grid>
            <Grid item xs={0} md={1} lg={2}></Grid>
          </Grid>
        </div>
        </UserContext.Provider>
    </Router>

  );
}

export default App;
