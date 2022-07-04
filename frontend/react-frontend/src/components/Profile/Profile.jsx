import ChangePasswordForm from "./ChangePasswordForm";
import { useParams } from "react-router";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import DarkmodeToggle from "./DarkModeToggle";
import React, { useContext, useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";
import Message from "../Utils/Message";

import EditOutlined from '@mui/icons-material/EditOutlined';
import Button from "@mui/material/Button";

const Profile = () => {

  const {user} = useContext(UserContext)
  let params = useParams()
  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!profile) {
      (async () => {
        const detail = await callApi(`profiles/${params.id}/`, "GET")
        if (detail.code === 200){    // if item has been deleted, go to home
          setProfile(detail)
        } else {
          console.log(detail.code)
        }
      })()
    }
  });

    return (
      <div id='Profile'>
        { !edit && profile ? 
        
          <>
            <ProfileDetail profile={profile}/>
            { user.info && user.info.id == params.id ? 
              <>
                <Button onClick={() => {setEdit(!edit)}}>  
                  <EditOutlined /> 
                </Button>
                <ChangePasswordForm />
                <DarkmodeToggle/>
              </>
            : 
              null
            }
          </>
        :
          <ProfileForm profile={profile}/>
        }

      </div>
    );
  };
  
  export default Profile;
