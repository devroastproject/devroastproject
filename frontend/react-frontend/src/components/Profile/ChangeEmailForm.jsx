import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import { useInput } from "../Utils/useInput";
import React, { useContext } from "react";
import { useHistory } from 'react-router';
import Message from "../Utils/Message";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ChangeEmailForm = () => {
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [email, emailInput] = useInput({type: 'email', label: 'New Email'});
    

    const changeEmail = async e => {
      e.preventDefault()
      let data = {
        'id': user.info.id,
        'email': email,
      }
      
      const res = await callApi(`users/${user.info.id}/`, 'PATCH', data, user.token)

      if (res.code === 200){    // forward to home on success
        setUser({...user, message: <Message message={res.message} type="success"/>})   
        history.push("/")
      } else {
        setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
      }
    }

    return (
        <form  onSubmit={changeEmail}>
            <Stack spacing={1}> 
                {emailInput}
                <Button type="submit" variant='contained' disabled={!email}>UPDATE EMAIL</Button>
            </Stack>
        </form>
    );
  };
  
  export default ChangeEmailForm;
