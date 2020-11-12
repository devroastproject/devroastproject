import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Login = () => {
    const [newUser, setNewuser] = useState(false)
    return(
    <div className='Login'>
        {newUser ? <RegistrationForm/> : <LoginForm/>}
        <br/>
        <button onClick={() => setNewuser(!newUser)}>{newUser ? 'Login' : 'Register a New Account'}</button>
    </div>
)
};

export default Login;
