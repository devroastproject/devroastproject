import UserContext from "../context/UserContext";
import React, { useContext } from "react";
import { callApi } from "../services/callAPI";
import { useHistory } from 'react-router';
import { useInput } from "./useInput";
import Message from "./Message";

const Profile = () => {
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [oldpw, oldpwInput] = useInput({type: 'password', label: 'Old Password'});
    const [newpw, newpwInput] = useInput({type: 'password', label: 'New Password'});
    const [confpw, confpwInput] = useInput({type: 'password', label: 'Confirm Password'});
    

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
        setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
      }
    }

    return (
      <div className='Profile'>
          { user.info ? 
            <div className='ChangePasswordForm'>
              {`Profile of ${user.info.username}`}
              <form  onSubmit={changePassword}>
                {oldpwInput}
                {newpwInput}
                {confpwInput}      
                <br />
                <input type="submit" value={'Update Password'} disabled={(oldpw && newpw && confpw && newpw === confpw) ? "" : "disabled" }/>
              </form>
            </div>
          : 
            "loading"
          }
      </div>
    );
  };
  
  export default Profile;
