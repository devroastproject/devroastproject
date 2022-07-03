import ChangePasswordForm from "./ChangePasswordForm";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/UserContext";
import AvatarButton from "../Utils/AvatarButton"
import DarkmodeToggle from "./DarkModeToggle";
import React, { useContext, useState, useEffect } from "react";
import Loading from "../Utils/Loading";


const Profile = () => {

  const {user} = useContext(UserContext)
  let params = useParams()
  let history = useHistory()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!profile) {
      (async () => {
        const detail = await callApi(`profiles/${params.id}/`, "GET")
        if (detail.code === 404){    // if item has been deleted, go to home
            history.push('/') 
        } else {
            setProfile(detail)
        }
      })()
    }
  });

    return (
      <div id='Profile'>
        { profile ?
          <>
            { user.info ? 
              <>
                <ChangePasswordForm />
                <DarkmodeToggle/>
              </>
            : 
              <Loading/>
            }
            </>
          :
            null
        }
          
      </div>
    );
  };
  
  export default Profile;
