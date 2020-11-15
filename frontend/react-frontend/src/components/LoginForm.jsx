import React, {useState} from "react";

const LoginForm = () => {

    const testdata = {
        'username': 'user',
        'password': 'userspword',
        'email': 'user@example.com'
    }

    const [data, setData] = useState(testdata)

    const loginUser = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/api/auth/login/',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(r =>{return r.json()}).catch(e => console.log(e))
        console.log(res)
    }

    return(
        <div className='RegistrationForm'>
            <form  onSubmit={loginUser}>
                <label htmlFor='user'>
                    User Name 
                    <input type='text' name='username' onChange ={ e => setData({...data, 'username': e.target.value})} defaultValue={'user'}/>
                </label>
                <label htmlFor='password'>
                    Password 
                    <input type='text' name='password' onChange ={ e => setData({...data, 'password': e.target.value})} defaultValue={'userspword'}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' onChange ={ e => setData({...data, 'email': e.target.value})} defaultValue={"user@example.com"}/>
                </label>
                <br />
                    <input type="submit" value="Login" />
            </form>
        </div>
)
};

export default LoginForm;
