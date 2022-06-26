import ChangePasswordForm from "./ChangePasswordForm"
import UserContext from "../../context/UserContext";
import AvatarButton from "../Utils/AvatarButton"
import DarkmodeToggle from "./DarkModeToggle";
import React, { useContext } from "react";
import Loading from "../Utils/Loading";


const Profile = () => {
    
  const {user, setUser} = useContext(UserContext)
  
    return (
      <div id='Profile'>
          { user.info ? 
            <>
              <AvatarButton username={user.info.username}/>
              <ChangePasswordForm />
              <DarkmodeToggle/>
            </>
          : 
            <Loading/>
          }
      </div>
    );
  };
  
  export default Profile;
