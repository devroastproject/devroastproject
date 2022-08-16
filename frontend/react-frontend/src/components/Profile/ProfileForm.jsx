import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext"
import { callApi } from "../../services/callAPI";
import ImageUpload from "../Utils/ImageUpload";
import { useInput } from "../Utils/useInput";
import { useHistory } from "react-router";
import Message from "../Utils/Message";

import Typography from '@mui/material/Typography';
import TextField  from "@mui/material/TextField";
import Container from '@mui/material/Container';
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const ProfileForm = ({profile}) => {

    const {user, setUser} = useContext(UserContext)

    // determine if form is used for creating or updating 
    let url = "", method = ""
    const newProfile = Boolean(profile === 404)
    if (newProfile){
        url = "profiles/"
        method = "POST"
        profile = {'role': '', 'location': '', 'pronouns': '', 'about': '', 'website': '', 'twitter': '', 'github': '', 'linkedin': '', 'avatar': ''}
    } else {
        url = `profiles/${user.info.id}/`  
        method = "PUT" 
    }

    const [role, roleInput] = useInput({type: 'text', label: 'Role', defaultValue: profile.role ? profile.role : ''});
    const [location, locationInput] = useInput({type: 'text', label: 'Location', defaultValue: profile.location ? profile.location : ''});
    const [pronouns, setPronouns] = useState(profile.pronouns ? profile.pronouns : '')
    const [about, aboutInput] = useInput({type: 'text', label: 'About', defaultValue: profile.about ? profile.about : ''});
    const [website, websiteInput] = useInput({type: 'text', label: 'Website', defaultValue: profile.website ? profile.website : ''});
    const [twitter, twitterInput] = useInput({type: 'text', label: 'Twitter', defaultValue: profile.twitter ? profile.twitter : ''});
    const [github, githubInput] = useInput({type: 'text', label: 'Github', defaultValue: profile.github ? profile.github : ''});
    const [linkedin, linkedinInput] = useInput({type: 'text', label: 'LinkedIn', defaultValue: profile.linkedin ? profile.linkedin : ''});

    let history = useHistory()

    const updateProfile = async e => {
        e.preventDefault()
        let data = {
            'id': profile.id,
            'user': user.info.id, 
            'role': role, 
            'location': location, 
            'pronouns': pronouns, 
            'about': about, 
            'website': website, 
            'twitter': twitter, 
            'github': github, 
            'linkedin': linkedin,
        }
        
        const res = await callApi(url, method, data, user.token)
        if (res.code >= 200 && res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    const pronounOptions = ['He/Him', 'She/Her', 'They/Them']

    return(
        <Container maxWidth="sm" id='ProfileForm'>
            <Stack spacing={2}>
                <Box mt={2}>
                    <Typography varient="h4" align='center' fontFamily='monospace'>
                        {profile === 404 ? 'PROFILE SETUP' : 'EDIT PROFILE'}
                    </Typography>
                </Box>
                <form onSubmit={updateProfile}>
                    <Stack spacing={1}> 
                        <ImageUpload image={profile.avatar} url={url} method={method}/>
                        {roleInput}
                        {aboutInput}
                        <TextField
                            value={pronouns}
                            label='Pronouns'
                            onChange={(e) => setPronouns(e.target.value)}
                            select
                        >
                            <MenuItem value={''} key={'null'}>None</MenuItem>
                            {pronounOptions.map((pronoun) => {
                                return (<MenuItem value={pronoun} key={pronoun}>{pronoun}</MenuItem>)
                            })}
                        </TextField>
                        {locationInput}
                        {websiteInput}
                        {twitterInput}
                        {githubInput}
                        {linkedinInput}
                        <Button type="submit" variant="contained" id="ProfileSubmitButton"> 
                            {profile === 404 ? 'SUBMIT PROFILE' : 'UPDATE PROFILE'}
                        </Button>
                    </Stack>
                </form>
                <br/>
            </Stack>
        </Container>
    )
};
export default ProfileForm;