import UserContext from "../../context/UserContext"
import { callApi } from "../../services/callAPI";
import { useInput } from "../Utils/useInput";
import { useHistory } from "react-router";
import React, { useContext } from "react";
import Message from "../Utils/Message";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const ProfileForm = ({profile}) => {

    const {user, setUser} = useContext(UserContext)

    // determine if form is used for creating or updating 
    let url = "", method = ""
    const newProfile = !Boolean(profile)
    if (newProfile){
        url = "profiles/"
        method = "POST"
        profile = {'role': '', 'location': '', 'pronouns': '', 'about': '', 'website': '', 'twitter': '', 'github': '', 'linkedin': ''}
    } else {
        url = `profiles/${user.info.id}/`  
        method = "PUT" 
    }

    const [role, roleInput] = useInput({type: 'text', label: 'Role', defaultValue: profile.role});
    const [location, locationInput] = useInput({type: 'text', label: 'Location', defaultValue: profile.location});
    const [pronouns, pronounsInput] = useInput({type: 'text', label: 'Pronouns', defaultValue: profile.pronouns});
    const [about, aboutInput] = useInput({type: 'text', label: 'About', defaultValue: profile.about});
    const [website, websiteInput] = useInput({type: 'text', label: 'Website', defaultValue: profile.website});
    const [twitter, twitterInput] = useInput({type: 'text', label: 'Twitter', defaultValue: profile.twitter});
    const [github, githubInput] = useInput({type: 'text', label: 'Github', defaultValue: profile.github});
    const [linkedin, linkedinInput] = useInput({type: 'text', label: 'LinkedIn', defaultValue: profile.linkedin});

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
            'linkedin': linkedin
        }
        
        const res = await callApi(url, method, data, user.token)
        if (res.code >= 200 || res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    return(
        <Container maxWidth="sm" id='ProfileForm'>
            <Stack spacing={2}>
                <Box mt={2}>
                    <Typography varient="h4" align='center' fontFamily='monospace'>
                        {profile.user === "" ? 'PROFILE SETUP' : 'EDIT PROFILE'}
                    </Typography>
                </Box>
                <form onSubmit={updateProfile}>
                    <Stack spacing={1}> 
                        {roleInput}
                        {locationInput}
                        {pronounsInput}
                        {aboutInput}
                        {websiteInput}
                        {twitterInput}
                        {githubInput}
                        {linkedinInput}
                        <Button type="submit" variant="contained" id="ProfileSubmitButton"> 
                            {profile.title === "" ? 'SUBMIT PROFILE' : 'UPDATE PROFILE'}
                        </Button>
                    </Stack>
                </form>
                <br/>
            </Stack>
        </Container>
    )
};
export default ProfileForm;

// user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
// role = models.CharField(max_length=255, help_text="Web Developer, Data Engineer, etc")
// location = models.CharField(max_length=255, help_text="What city your located in")
// pronouns = models.CharField(max_length=10, choices=PRONOUN_OPTIONS)
// about = models.TextField(default="Personal summary.", help_text="A little bit about yourself.")
// website = models.URLField(help_text="URL for your personal website.", null=True)
// twitter = models.URLField(help_text="URL for your Twitter feed.", null=True)
// github = models.URLField(help_text="URL for your GitHub.", null=True)
// linkedin = models.URLField(help_text="URL for your LinkedIn page.", null=True)
