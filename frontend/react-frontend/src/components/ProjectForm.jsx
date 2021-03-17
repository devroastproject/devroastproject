import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import UserContext from "../context/UserContext";
import { callApi } from "../services/api";
import Message from "./Message";
import { useInput } from "./useInput";

const ProjectForm = ({project}) => {
    let url = "";
    let method = ""
    if (project){
        url = `projects/${project.id}/`
        method = "PUT"
    } else {
        url = "projects/"
        method = "POST"
        project = {"title": "", "repo_url": "", "hosted_url": "", "description": ""}
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
        if (res.code === 200){    // forward to home on success
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.push(url)
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
