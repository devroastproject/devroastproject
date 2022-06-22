import UserContext from "../../context/UserContext";
import React, { useContext } from "react";
import ChangePasswordForm from "./ChangePasswordForm"
import AvatarButton from "../Utils/AvatarButton"
import Loading from "../Utils/Loading";

const Profile = () => {
    
  const {user, setUser} = useContext(UserContext)

    return (
      <div className='Profile'>
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
