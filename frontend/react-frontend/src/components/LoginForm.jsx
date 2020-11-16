import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";

const LoginForm = () => {
    
    const {user, setUser} = useContext(UserContext)

    const [data, setData] = useState({})

    const loginUser = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/api/auth/login/',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(r =>{return r.json()}).catch(e => console.log(e))
        console.log(res)
        setUser({...user, 'key':res['key']})
    }

    return(
        <div className='RegistrationForm'>
            <form  onSubmit={loginUser}>
                <label htmlFor='user'>
                    User Name 
                    <input type='text' name='username' onChange ={ e => setData({...data, 'username': e.target.value})}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' onChange ={ e => setData({...data, 'email': e.target.value})}/>
                </label>
                <label htmlFor='password'>
                    Password 
                    <input type='password' name='password' onChange ={ e => setData({...data, 'password': e.target.value})}/>
                </label>
                <br />
                    <input type="submit" value="Login" />
            </form>
        </div>
)
};

export default LoginForm;
