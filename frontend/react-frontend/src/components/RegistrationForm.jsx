import React, {useRef} from "react";

const RegistrationForm = () => {

    const form = useRef(null)

    const registerUser = async e => {
        e.preventDefault()
        const data = new FormData(form.current)
        const res = await fetch('http://localhost:8000/api/auth/registration/',{
            method: 'POST', 
            mode: 'no-cors', 
            headers: {'Content-Type': 'application/json'}, 
            body: data
        })
        console.log(res)
    }

    return(
        <div className='RegistrationForm'>
            <form ref ={form} onSubmit={registerUser}>
                <label htmlFor='username'>
                    User Name 
                    <input type='text' name='username'/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' />
                </label>
                <label htmlFor='password1'>
                    Password 
                    <input type='text' name='password1' />
                </label>
                <label htmlFor='password2'>
                    Confirm Password 
                    <input type='text' name='password2' />
                </label>
                <br />
                    <input type="submit" value="Register New User" />
            </form>
        </div>
)
};

export default RegistrationForm;
