import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import ImageUpload from "../Utils/ImageUpload";
import { useInput } from "../Utils/useInput";
import { useHistory } from "react-router";
import React, { useContext } from "react";
import Message from "../Utils/Message";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


const ProjectForm = ({project}) => {
    // determine if form is used for creating or updating 
    let url = "", method = ""
    const newProject = !Boolean(project)
    if (newProject){
        url = "projects/"
        method = "POST"
        project = {"title": "", "cover": "", "repo_url": "", "hosted_url": "", "description": ""}
    } else {
        url = `projects/${project.id}/`  
        method = "PUT" 
    }

    const [title, titleInput] = useInput({type: 'text', label: 'Title', defaultValue: project.title});
    const [repo_url, repoInput] = useInput({type: 'text', label: 'Repo URL', defaultValue: project.repo_url});
    const [hosted_url, hostedInput] = useInput({type: 'text', label: 'Hosted URL', defaultValue: project.hosted_url});
    const [description, descriptionInput] = useInput({type: 'text', label: 'Description', defaultValue: project.description, multiline: true});

    const {user, setUser} = useContext(UserContext)
    let history = useHistory()

    const updateProject = async e => {
        e.preventDefault()
        let data = {
            "id": project.id,
            "user": user.info.id,
            "title": title,
            "repo_url": repo_url,
            "hosted_url": hosted_url,
            "description": description
        }
        
        const res = await callApi(url, method, data, user.token)
        if (res.code >= 200 || res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            if (newProject ){ history.push("/") } else { history.go(0) } // got to home if new, refresh if edit
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    return(
        <Container maxWidth="sm" id='ProjectForm'>
            <Stack spacing={2}>
                <Box mt={2}>
                    <Typography varient="h4" align='center' fontFamily='monospace'>
                        {project.title === "" ? 'NEW PROJECT' : 'EDIT PROJECT'}
                    </Typography>
                </Box>
                <form onSubmit={updateProject}>
                    <Stack spacing={1}> 
                        <ImageUpload image={project.cover} url={url} method={method} id={project.id}/>
                        {titleInput}
                        {repoInput}
                        {hostedInput}
                        {descriptionInput}
                        <Button type="submit" variant="contained" disabled={!(title && description)} id="ProjectSubmitButton"> 
                            {project.title === "" ? 'SUBMIT NEW PROJECT' : 'UPDATE PROJECT'}
                        </Button>
                    </Stack>
                </form>
                <br/>
            </Stack>
        </Container>
    )
};
export default ProjectForm;
