import ChangePasswordForm from "./ChangePasswordForm"
import UserContext from "../../context/UserContext";
import AvatarButton from "../Utils/AvatarButton"
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
            </>
          : 
            <Loading/>
          }
      </div>
    );
  };
  
  export default Profile;
