import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";
import { useHistory } from 'react-router';
import { useEffect } from "react";
const Login = () => {
    // user context
    const {user, setUser} = useContext(UserContext) // user info

    // local state
    const [data, setData] = useState({})    // form input data
    const [newUser, setNewUser] = useState(false)   // boolean controls login/registration
    let history = useHistory()

    const loginURL = 'http://localhost:8000/api/auth/login/'
    const registerURL = 'http://localhost:8000/api/auth/registration/'

    const loginUser = async e => {
        e.preventDefault()
        let url = newUser ? registerURL : loginURL
        const res = await fetch(url, {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        })
        .then(r =>{return r.json()})
        .catch(e => console.log(e))
        if (res['key']){        // if user token returned, add to context
            setUser({...user, token: `Token ${res['key']}`})   
        }
    }
    
    useEffect( () => {
        if (user.token) { history.push("/")}   // redirect to home
    });

    return(
        <div className='LoginForm'>
            <form  onSubmit={loginUser}>
                <label htmlFor='user'>
                    User Name 
                    <input type='text' name='username' onChange ={ e => setData({...data, 'username': e.target.value})}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' onChange ={ e => setData({...data, 'email': e.target.value})}/>
                </label>
                {newUser ?  // registration password fields 
                <>
                    <label htmlFor='password1'>
                        Password 
                        <input type='password' name='password1' onChange ={ e => setData({...data, 'password1': e.target.value})}/>
                    </label>
                    <label htmlFor='password2'>
                        Confirm Password 
                        <input type='password' name='password2' onChange ={ e => setData({...data, 'password2': e.target.value})}/>
                    </label>
                </>
                : // login password fields
                    <label htmlFor='password'>
                        Password 
                        <input type='password' name='password' onChange ={ e => setData({...data, 'password': e.target.value})}/>
                    </label>
                }
                <br />
                    <input type="submit" value={newUser ? 'Register' : "Log In"} />
            </form>

            <br/> {/* button toggles Log In / Register New User     */}
                <button onClick={() => setNewUser(!newUser)}>
                    {newUser ? 'Login an Existing User' : 'Register a New Account'}
                </button>
        </div>
)};

export default Login;
