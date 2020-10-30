import React, {useState} from "react";

const RegistrationForm = () => {

    const [newUser, setNewUser] = useState({})

    const postRequest = async () => {
        const response = await fetch('http://localhost:8000/api/auth/registration/', {
            method: 'POST', 
            mode: 'no-cors', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(newUser)
        });
        console.log(response)
    }
    const registerUser = e => {
        e.preventDefault()
        console.log(newUser)
        postRequest().catch(console.log('error'))
    }

    return(
    <div className='RegistrationForm'>
        <form onSubmit={registerUser}>
            <label htmlFor='user'>
            User Name
            <input type='text' name='user' required={true} value={ newUser.name || '' } onChange={e => setNewUser({...newUser, name: e.target.value})}/>
            </label>
            <label htmlFor='email'>
            Email
            <input type='text' name='email' required={true} value={ newUser.email || '' } onChange={e => setNewUser({...newUser, email: e.target.value})}/>
            </label>
            <label htmlFor='password1'>
            Password
            <input type='text' name='password1' required={true} value={ newUser.password1 || '' } onChange={e => setNewUser({...newUser, password1: e.target.value})}/>
            </label>
            <label htmlFor='password2'>
            Confirm Password
            <input type='text' name='password2' required={true} value={ newUser.password2 || '' } onChange={e => setNewUser({...newUser, password2: e.target.value})}/>
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
)
};

export default RegistrationForm;
