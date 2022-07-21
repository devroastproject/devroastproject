import React from "react";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const ProfileRow = ({children}) => {
    return(
        <Stack direction='row' spacing={2}>
            {children.map((child) => { return (
                <Typography key={child} style={{wordWrap: 'break-word'}}>
                    {child}
                </Typography>  
            )})}
        </Stack>
    )
}

const ProfileDetail = ({profile}) => {
    
    const{role, location, pronouns, about, website, twitter, github, linkedin} = profile

    return(
        profile !== 404 && (
        <Stack id='ProfileDetail' spacing={1}>
            <ProfileRow>
                Role: {role}
            </ProfileRow>
            <Stack spacing={2}>
                About: <br/> {about}
            </Stack>
            <ProfileRow>
                Pronouns: {pronouns}
            </ProfileRow>
            <ProfileRow>
                <LocationOnOutlinedIcon/>{location}
            </ProfileRow>
            <ProfileRow>
                <LanguageOutlinedIcon/>{website}
            </ProfileRow>
            <ProfileRow>
                <TwitterIcon/>{twitter}
            </ProfileRow>
            <ProfileRow>
                <GitHubIcon/>{github}
            </ProfileRow>
            <ProfileRow>
                <LinkedInIcon/>{linkedin}
            </ProfileRow>
        </Stack>
        )
    )
};

export default ProfileDetail
