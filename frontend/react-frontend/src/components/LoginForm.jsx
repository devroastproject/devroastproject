import React, {useRef} from "react";

const LoginForm = () => {

    const form = useRef(null)

    const LoginUser = async e => {
        e.preventDefault()
        const data = new FormData(form.current)
        const res = await fetch('http://localhost:8000/api/auth/login/',{
            method: 'POST', 
            mode: 'no-cors', 
            headers: {'Content-Type': 'application/json'}, 
            body: data
        })
        const key = await res.json()
        console.log(key)
    }

    return(
        <div className='RegistrationForm'>
            <form ref ={form} onSubmit={LoginUser}>
                <label htmlFor='user'>
                    User Name 
                    <input type='text' name='username' defaultValue={'sherp'}/>
                </label>
                <label htmlFor='password'>
                    Password 
                    <input type='text' name='password' defaultValue={'flerpy22'}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' defaultValue={"sorp@sherp.com"} />
                </label>
                <br />
                    <input type="submit" value="Login" />
            </form>
        </div>
)
};

export default LoginForm;
