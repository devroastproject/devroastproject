import React, { useContext, useState, useEffect } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import DarkmodeToggle from "./DarkModeToggle";
import ProfileDetail from "./ProfileDetail";
import { useParams } from "react-router";
import ProfileForm from "./ProfileForm";
import Loading from "../Utils/Loading";

import CancelOutlined from '@mui/icons-material/CancelOutlined';
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
        if (detail.code === 200){ 
          setProfile(detail)
        } else {
          setProfile(404)
        }
      })()
    }
  }, []);

    return (
      <div id='Profile'>
        { profile ? // show loading until profile is retrieved
          <>
          { user.info && user.info.id === parseInt(params.id) ? // if user's profile, render forms and control buttons
            <>
            { profile === 404 ? // if profile doesn't exist, render create form
              <ProfileForm profile={profile} /> 
            : edit ?  // if profile exists, use `edit` to toggle between display and edit forms
              <>
              <ProfileForm profile={profile} />
              <Button onClick={() => {setEdit(!edit)}}>  
                <CancelOutlined/>
              </Button>
              </>
              :  
              <>
              <ProfileDetail profile={profile}/> 
              <Button onClick={() => {setEdit(!edit)}}>  
                <EditOutlined />
              </Button>
              </>
            }
              <ChangePasswordForm />
              <DarkmodeToggle/>
            </>
          : // if not the user's profile, display profile info        
            <ProfileDetail profile={profile}/>
          }
        </>
        :
          <Loading/>
        }
      </div>
    );
  };
  
  export default Profile;
