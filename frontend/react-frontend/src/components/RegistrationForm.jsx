import React, {useState, useContext} from "react";
import UserContext from "../context/UserContext";

const RegistrationForm = () => {
    
    const {user, setUser} = useContext(UserContext)

    const [data, setData] = useState({})

    const registerUser = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/api/auth/registration/',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(r =>{return r.json()}).catch(e => console.log(e))
        console.log(res)
        setUser({...user, 'key':res['key']})
    }

    return(
        <div className='RegistrationForm'>
            <form onSubmit={registerUser}>
                <label htmlFor='username'>
                    User Name 
                    <input type='text' name='username' onChange ={ e => setData({...data, 'username': e.target.value})}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' onChange ={ e => setData({...data, 'email': e.target.value})}/>
                </label>
                <label htmlFor='password1'>
                    Password 
                    <input type='password' name='password1' onChange ={ e => setData({...data, 'password1': e.target.value})}/>
                </label>
                <label htmlFor='password2'>
                    Confirm Password 
                    <input type='password' name='password2' onChange ={ e => setData({...data, 'password2': e.target.value})}/>
                </label>
                <br />
                    <input type="submit" value="Register New User" />
            </form>
        </div>
)
};

export default RegistrationForm;
