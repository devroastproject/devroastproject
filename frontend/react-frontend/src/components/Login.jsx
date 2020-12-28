import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import { callApi } from "../services/api";
import { useHistory } from 'react-router';
import { useInput } from "./useInput";

const Login = () => {
    // user context
    const {user, setUser} = useContext(UserContext) // user info

    // local state
    const [newUser, setNewUser] = useState(false)   // boolean controls login/registration
    let history = useHistory()
    const [username, userInput] = useInput({type: 'text', label: 'User Name'});
    const [email, emailInput] = useInput({type: 'email', label: 'Email'});
    const [password1, pw1Input] = useInput({type: 'password', label: 'Password'});
    const [password2, pw2Input] = useInput({type: 'password', label: 'Confirm Password'});
  

    const loginUser = async e => {
        e.preventDefault()
        let data = {
            'username': username,
            'email': email,
        }
        if (newUser) {
            data['password1'] = password1
            data['password2'] = password2
        } else { 
            data['password'] = password1
        }
        let url = newUser ? 'auth/registration/' : 'auth/login/'
        
        const res = await callApi(url, 'POST', data)
        if (res.key){        // if user token returned, add to context
            setUser({...user, token: `Token ${res.key}`})   
        }
    }
    
    useEffect( () => {
        if (user.token) { history.push("/")}   // redirect to home
    });

    return(
        <div className='LoginForm'>
            <form onSubmit={loginUser}>
                {userInput}
                {emailInput}
                {newUser ? <> {pw1Input} {pw2Input} </> : pw1Input}
                <br/>
                <input type="submit" value={newUser ? 'Register' : "Log In"} />
            </form>
            <br/> {/* button toggles Log In / Register New User     */}
                <button onClick={() => setNewUser(!newUser)}>
                    {newUser ? 'Login an Existing User' : 'Register a New Account'}
                </button>
        </div>)
};

export default Login;