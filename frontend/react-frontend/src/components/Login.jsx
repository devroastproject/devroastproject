import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import { callApi } from "../services/api";
import { useHistory } from 'react-router';
import Input from "./Input";

const Login = () => {
    // user context
    const {user, setUser} = useContext(UserContext) // user info

    // local state
    const [data, setData] = useState({})    // form input data
    const [newUser, setNewUser] = useState(false)   // boolean controls login/registration
    let history = useHistory()

    const loginUser = async e => {
        e.preventDefault()
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
            <form  onSubmit={loginUser}>
                <Input name='username' type='text' label='User Name' setter={setData} data={data}/>
                <Input name='email' type='email' label='Email' setter={setData} data={data}/>
                {newUser ?  // registration password fields 
                <>
                    <Input name='password1' type='password' label='Password' setter={setData} data={data}/>
                    <Input name='password2' type='password' label='Confirm Password' setter={setData} data={data}/>
                </>
                : // login password fields
                    <Input name='password' type='password' label='Password' setter={setData} data={data}/>
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
