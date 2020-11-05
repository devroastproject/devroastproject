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
        console.log(res)
    }

    return(
        <div className='RegistrationForm'>
            <form ref ={form} onSubmit={LoginUser}>
                <label htmlFor='user'>
                    User Name 
                    <input type='text' name='username' defaultValue={'wogga'}/>
                </label>
                <label htmlFor='password'>
                    Password 
                    <input type='text' name='password' defaultValue={'pbkdf2_sha256$180000$Q7b1RtYsPQXg$0+7lLIqaQ1YFNJxK//E08QSdedtR0YBSIeym2fEHxig='}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' defaultValue={"wogga@wagga.com"} />
                </label>
                <br />
                    <input type="submit" value="Submit" />
            </form>
        </div>
)
};

export default LoginForm;
