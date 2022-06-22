import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import { callApi } from "../services/callAPI";
import { useHistory } from 'react-router';
import { useInput } from "./Utils/useInput";
import Message from "./Utils/Message";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Login = () => {
    // user context
    const {user, setUser} = useContext(UserContext) // user info

    // local state
    const [newUser, setNewUser] = useState(false)   // boolean controls login/registration
    let history = useHistory()
    const [username, userInput] = useInput({type: 'text', label: 'User Name'});
    const [email, emailInput] = useInput({type: 'email', label: 'Email'});
    const [password1, pw1Input] = useInput({type: 'password', label: 'Password'});
    const [password2, pw2Input] = useInput({type: 'password', label: 'Confirm Password'});
  

    const loginUser = async e => {
        e.preventDefault()
        let data = {
            'username': username,
            'email': email,
        }
        if (newUser) {
            data['password1'] = password1
            data['password2'] = password2
        } else { 
            data['password'] = password1
        }
        let url = newUser ? 'auth/registration/' : 'auth/login/'
        
        const res = await callApi(url, 'POST', data)
        if (res.key){        // if user token returned, add to context
            let userToken = `Token ${res.key}`
            setUser({...user, token: userToken})   
            localStorage.setItem('user_token', userToken)
            localStorage.setItem('token_time', Date.now() )
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }
    
    useEffect( () => {
        if (user.token) { history.goBack()}   // redirect to previous page
    });

    return(
        <Container maxWidth="sm" className='LoginForm'>
            <Stack spacing={2}>
                <Box mt={2}>
                    <Typography varient="h4" align='center' fontFamily='monospace'>
                        {newUser ? "NEW USER" : "LOG IN"}
                    </Typography>
                </Box>
                <form onSubmit={loginUser}>
                    <Stack spacing={1}>
                        {userInput}
                        {emailInput}
                        {newUser ? <> {pw1Input} {pw2Input} </> : pw1Input}
                        <Button type="submit" variant="contained" 
                            disabled={ !(
                                    (newUser && username && email && password1 && password2 && password1 === password2)
                                    ||
                                    (!newUser && username && email && password1)
                                )}>
                            {newUser ? 'Register' : "Log In"}
                        </Button>
                    </Stack>
                </form>
                {/* button toggles Log In / Register New User     */}
                <Button variant="text" onClick={() => setNewUser(!newUser)} size="small">
                    {newUser ? 'Login an Existing User' : 'Register a New Account'}
                </Button>
            </Stack>
        </Container>)
};

export default Login;