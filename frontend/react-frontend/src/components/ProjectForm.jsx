import React, { useState } from "react";
import { useInput } from "./useInput";

const ProjectForm = ({project}) => {

    project = project || {title:"", repo_url:"", hosted_url:"", description:""}

    const [title, titleInput] = useInput({type: 'text', label: 'Title', defaultValue: project.title});
    const [repo_url, repoInput] = useInput({type: 'text', label: 'Repo URL', defaultValue: project.repo_url});
    const [hosted_url, hostedInput] = useInput({type: 'text', label: 'Hosted URL', defaultValue: project.hosted_url});
    const [description, setDescription] = useState(project.description);

    const updateProject = async e => {
        e.preventDefault()
        console.log(title, repo_url, hosted_url, description)
    }

    return(
        <form onSubmit={updateProject}>
            {titleInput}
            {repoInput}
            {hostedInput}
            <label> Description <textarea defaultValue={description} onChange={e => setDescription(e.target.value)}></textarea></label> 
            <input type="submit" value={'Submit'} />
        </form>
    )
};
export default ProjectForm;
