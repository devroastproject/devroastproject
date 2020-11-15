import React, {useState} from "react";

const RegistrationForm = () => {
    
    const testdata = {
        'username': 'user',
        'password': 'userspword',
        'email': 'user@example.com'
    }

    const [data, setData] = useState(testdata)

    const registerUser = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8000/api/auth/registration/',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data)
        }).then(r =>{return r.json()}).catch(e => console.log(e))
        console.log(res)
    }

    return(
        <div className='RegistrationForm'>
            <form onSubmit={registerUser}>
                <label htmlFor='username'>
                    User Name 
                    <input type='text' name='username' onChange ={ e => setData({...data, 'username': e.target.value})} defaultValue={'user'}/>
                </label>
                <label htmlFor='email'>
                    Email 
                    <input type='text' name='email' onChange ={ e => setData({...data, 'email': e.target.value})} defaultValue={"user@example.com"} />
                </label>
                <label htmlFor='password1'>
                    Password 
                    <input type='text' name='password1' onChange ={ e => setData({...data, 'password1': e.target.value})} defaultValue={'userspword'}/>
                </label>
                <label htmlFor='password2'>
                    Confirm Password 
                    <input type='text' name='password2' onChange ={ e => setData({...data, 'password2': e.target.value})} defaultValue={'userspword'}/>
                </label>
                <br />
                    <input type="submit" value="Register New User" />
            </form>
        </div>
)
};

export default RegistrationForm;
