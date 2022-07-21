import React, { useContext, useState, useEffect } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import ChangeEmailForm from "./ChangeEmailForm";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import DarkmodeToggle from "./DarkModeToggle";
import ProfileDetail from "./ProfileDetail";
import { useParams } from "react-router";
import ProfileForm from "./ProfileForm";
import Loading from "../Utils/Loading";
import PropTypes from 'prop-types';

import CancelOutlined from '@mui/icons-material/CancelOutlined';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import Button from "@mui/material/Button";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Profile = () => {

  const {user} = useContext(UserContext)
  let params = useParams()

  const [ownProfile, setOwnProfile] = useState(false)

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

  useEffect(() => {
    setOwnProfile(user.info && user.info.id === parseInt(params.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} id='Profile'>
      
      { profile ? // show loading until profile is retrieved
        <>
          <Tabs value={tab} onChange={handleChange} 
            TabIndicatorProps={{ sx: { display: 'none' } }}
            sx={{'& .MuiTabs-flexContainer': { flexWrap: 'wrap'}}}
          >
            <Tab label={
              ownProfile ? 'My Profile' :
              profile === 404 ? 'Profile Not Set Up Yet'
              : profile.username + "'s Profile"
              } 
              {...a11yProps(0)} />
            {ownProfile && ([
              <Tab label="Account Settings" {...a11yProps(1)} key={1}/>,
              <Tab label="App Settings" {...a11yProps(2)} key={2}/> 
            ])}
          </Tabs>
          <TabPanel value={tab} index={0}> 
            { (profile === 404 && ownProfile) || edit ? // if owned profile doesn't exist, render create form
              <ProfileForm profile={profile} />         // if profile exists, use `edit` to toggle between display and edit forms
            :  
              <ProfileDetail profile={profile}/> 
            }
            { ownProfile && profile !== 404 && // if profile exists and is owned, show edit button
              (<Button onClick={() => {setEdit(!edit)}}>  
                {edit ? <CancelOutlined/> : <EditOutlined />}
              </Button>)
            }
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Change Username</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p>TODO</p>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Change Password</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ChangePasswordForm />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Update Email</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ChangeEmailForm />
              </AccordionDetails>
            </Accordion>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <DarkmodeToggle/>
          </TabPanel>
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