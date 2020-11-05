import React, {useState} from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Login = () => {
    const [newUser, setNewuser] = useState(false)
    return(
    <div className='Login'>
        {newUser ? <RegistrationForm/> : <LoginForm/>}
        <button onClick={() => setNewuser(!newUser)}>Register a New Account</button>
    </div>
)
};

export default Login;
