import UserContext from "../context/UserContext";
import React, { useContext, useState } from "react";
import { callApi } from "../services/api";
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

const Profile = () => {
    const {user, setUser} = useContext(UserContext)

    const [data, setData] = useState({})    // form input data
    const [confirmPW, setConfirmPW] = useState('') // state used confirm new password
    let history = useHistory()

    const changePassword = async e => {
      e.preventDefault()
      const res = await callApi("users/me/change_password/",'PUT', data, user.token)
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
                <label htmlFor='old_password'>
                  Old Password 
                  <input type='password' name='old_password' onChange ={ e => setData({...data, "old_password" : e.target.value})}/>
                </label>
                <label htmlFor='new_password'>
                  New Password 
                  <input type='password' name='new_password' onChange ={ e => setData({...data, "new_password" : e.target.value})}/>
                </label>
                <label htmlFor='confirm_password'>
                  Confirm New Password 
                  <input type='password' name='confirm_password'onChange ={ e => setConfirmPW(e.target.value)}/>
                </label>        
                <br />
                <input type="submit" value={'Update Password'} disabled={(confirmPW === data["new_password"]) ? "" : "disabled" }/>
              </form>
            </div>

          : 
            <Link to="/login"> <li>Log In</li> </Link>
          }
      </div>
    );
  };
  
  export default Profile;
