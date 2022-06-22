import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import React, { useContext } from "react";
import { useHistory } from 'react-router';
import { useInput } from "../Utils/useInput";
import Message from "../Utils/Message";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ChangePasswordForm = () => {
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [oldpw, oldpwInput] = useInput({type: 'password', label: 'Old Password'});
    const [newpw, newpwInput] = useInput({type: 'password', label: 'New Password'});
    const [confpw, confpwInput] = useInput({type: 'password', label: 'Confirm New Password'});
    

    const changePassword = async e => {
      e.preventDefault()
      let data = {
        'old_password': oldpw,
        'new_password': newpw
      }
      
      const res = await callApi("users/me/change_password/", 'PUT', data, user.token)

      if (res.code === 200){    // forward to home on success
        setUser({...user, message: <Message message={res.message} type="success"/>})   
        history.push("/")
      } else {
        setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
      }
    }

    return (
        <form  onSubmit={changePassword}>
            <Stack spacing={1}> 
                {oldpwInput}
                {newpwInput}
                {confpwInput}      
                <Button type="submit" variant='contained' disabled={!(oldpw && newpw && confpw && newpw === confpw)}>UPDATE PASSWORD</Button>
            </Stack>
        </form>
    );
  };
  
  export default ChangePasswordForm;
