import UserContext from "../context/UserContext";
import React, { useContext } from "react";
import { callApi } from "../services/api";
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import {useInput} from "./useInput";


const Profile = () => {
    const {user, setUser} = useContext(UserContext)

    let history = useHistory()
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
      if (res){    // forward to home on success
        history.push("/")
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
                <input type="submit" value={'Update Password'} disabled={(newpw === confpw) ? "" : "disabled" }/>
              </form>
            </div>
          : 
            <Link to="/login"> <li>Log In</li> </Link>
          }
      </div>
    );
  };
  
  export default Profile;
