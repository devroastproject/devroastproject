import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import { useInput } from "../Utils/useInput";
import React, { useContext } from "react";
import { useHistory } from 'react-router';
import Message from "../Utils/Message";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const UpdateUserForm = ({element}) => {
    
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [ele, eleInput] = useInput({type: element, label: `New ${element}`, defaultValue: user.info[element]});
    

    const changeElement = async e => {
      e.preventDefault()
      let data = {
        'id': user.info.id,
        [element]: ele,
      }

      const res = await callApi(`users/${user.info.id}/`, 'PATCH', data, user.token)

      if (res.code === 200){
        setUser({...user, message: <Message message={res.message} type="success"/>})   
        history.go(0)           // refresh page on post success
      } else {
        setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
      }
    }

    return (
        <form  onSubmit={changeElement}>
            <Stack spacing={1}> 
                {eleInput}
                <Button type="submit" variant='contained' disabled={!ele}>UPDATE {element}</Button>
            </Stack>
        </form>
    );
  };
  
  export default UpdateUserForm;
