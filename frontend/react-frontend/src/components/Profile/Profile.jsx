import React, { useContext, useState, useEffect } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import DarkmodeToggle from "./DarkModeToggle";
import ProfileDetail from "./ProfileDetail";
import { useParams } from "react-router";
import ProfileForm from "./ProfileForm";
import Loading from "../Utils/Loading";
import PropTypes from 'prop-types';

import CancelOutlined from '@mui/icons-material/CancelOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Button from "@mui/material/Button";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Profile = () => {

  const {user} = useContext(UserContext)
  let params = useParams()
  const [profile, setProfile] = useState(null)
  const [edit, setEdit] = useState(false)
  const [tab, setTab] = useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} id='Profile'>
      
      { profile ? // show loading until profile is retrieved
        <>
        { user.info && user.info.id === parseInt(params.id) ? // if user's profile, render forms and control buttons
          <>
          <Tabs value={tab} onChange={handleChange} 
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{'& .MuiTabs-flexContainer': { flexWrap: 'wrap'}}}
          >
            <Tab label={`${user.info.username}'s Profile`} {...a11yProps(0)} />
            <Tab label="Change Password" {...a11yProps(1)} />
            <Tab label="App Settings" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={tab} index={0}> 
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
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ChangePasswordForm />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <DarkmodeToggle/>
          </TabPanel>
          </>
        : // if not the user's profile, display profile info      
          <TabPanel value={tab} index={0}>  
            <ProfileDetail profile={profile}/>
          </TabPanel>
        }
      </>
      :
        <Loading/>
      }
    </Box>
  );
};
  
  export default Profile;

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }