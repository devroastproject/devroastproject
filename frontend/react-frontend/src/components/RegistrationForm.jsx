import React, {useState} from "react";

const RegistrationForm = () => {

    const [newUser, setNewUser] = useState({})

    const postRequest = async () => {
        const dat =JSON.stringify(newUser)
        console.log(dat)
        const response = await fetch('http://localhost:8000/rest-auth/registration/', {
            method: 'POST', 
            mode: 'no-cors', 
            headers: {'Content-Type': 'application/json'}, 
            body: dat
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
            <input type='text' name='username' value={ newUser.username || '' } onChange={e => setNewUser({...newUser, 'username': e.target.value})}/>
            </label>
            <label htmlFor='email'>
            Email
            <input type='text' name='email' value={ newUser.email || '' } onChange={e => setNewUser({...newUser, 'email': e.target.value})}/>
            </label>
            <label htmlFor='password1'>
            Password
            <input type='text' name='password1' value={ newUser.password1 || '' } onChange={e => setNewUser({...newUser, 'password1': e.target.value})}/>
            </label>
            <label htmlFor='password2'>
            Confirm Password
            <input type='text' name='password2' value={ newUser.password2 || '' } onChange={e => setNewUser({...newUser, 'password2': e.target.value})}/>
            </label>
            <br />
            <input type="submit" value="Submit" />
        </form>
    </div>
)
};

export default RegistrationForm;
