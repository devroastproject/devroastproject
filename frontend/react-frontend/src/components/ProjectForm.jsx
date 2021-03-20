import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router";
import { callApi } from "../services/callAPI";
import { useInput } from "./useInput";
import Message from "./Message";

const ProjectForm = ({project}) => {
    // determine if form is used for creating or updating 
    let url = "", method = ""
    const newProject = !Boolean(project)
    if (newProject){
        url = "projects/"
        method = "POST"
        project = {"title": "", "repo_url": "", "hosted_url": "", "description": ""}
    } else {
        url = `projects/${project.id}/`  
        method = "PUT" 
    }

    const [title, titleInput] = useInput({type: 'text', label: 'Title', defaultValue: project.title});
    const [repo_url, repoInput] = useInput({type: 'text', label: 'Repo URL', defaultValue: project.repo_url});
    const [hosted_url, hostedInput] = useInput({type: 'text', label: 'Hosted URL', defaultValue: project.hosted_url});
    const [description, setDescription] = useState(project.description);

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
            {newProject ? history.push("/") : history.go(0)}
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
        }
    }

    return(
        <>
        <form onSubmit={updateProject}>
            {titleInput}
            {repoInput}
            {hostedInput}
            <label> Description <textarea defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea></label> 
            <br/>
            <input type="submit" value={'Submit'} />
        </form>
        <br/>
        </>
    )
};
export default ProjectForm;
