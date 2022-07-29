import React from "react";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ProfileRow = ({children, noWrap=true}) => {
    return(
        <Stack direction='row' spacing={2}>
            {children.map((child) => { return (
                <Typography key={child} noWrap={noWrap}>
                    {child}
                </Typography>  
            )})}
        </Stack>
    )
}

const ProfileDetail = ({profile}) => {
    
    const{role, location, pronouns, about, website, twitter, github, linkedin, avatar, username} = profile

    return(
        profile !== 404 && (
        <Stack id='ProfileDetail' spacing={2}>   
            <Avatar 
                src={`http://localhost:8000${avatar}`}
                sx={{ width: 150, height: 150 }}
            >
                {username[0]} 
            </Avatar>
            
            <Stack  spacing={1}>
            {role && 
                <ProfileRow>
                    Role: {role}
                </ProfileRow> }
            {about && 
                <Stack >
                    About: <br/> 
                    <Typography sx={{wordWrap:"break-word"}} noWrap={false}>{about}</Typography>
                </Stack> }
            {pronouns && 
                <ProfileRow>
                    Pronouns: {pronouns}
                </ProfileRow> }
            {location && 
                <ProfileRow>
                    <LocationOnOutlinedIcon/>{location}
                </ProfileRow> }
            {website && 
                <ProfileRow>
                    <LanguageOutlinedIcon/>{website}
                </ProfileRow> }
            {twitter &&
                <ProfileRow>
                    <TwitterIcon/>{twitter}
                </ProfileRow> }
            {github &&
                <ProfileRow>
                    <GitHubIcon/>{github}
                </ProfileRow> }
            {linkedin && 
                <ProfileRow>
                    <LinkedInIcon/>{linkedin}
                </ProfileRow> }
            </Stack>
        </Stack> 
        )
    )
};

export default ProfileDetail
