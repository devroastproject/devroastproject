import React from "react";
import { useInput } from "./useInput";

const ProjectForm = ({project}) => {
    
    const [title, titleInput] = useInput({type: 'text', label: 'Title', defaultValue: project.title});
    const [repo_url, repoInput] = useInput({type: 'text', label: 'Repo URL', defaultValue: project.repo_url});
    const [hosted_url, hostedInput] = useInput({type: 'text', label: 'Hosted URL', defaultValue: project.hosted_url});
    const [description, descriptionInput] = useInput({type: 'textarea', label: 'Description', defaultValue: project.description});

    const updateProject = () => {
        console.log(title, repo_url, hosted_url, description)
    }
    return(
        <form onSubmit={updateProject}>
            {titleInput}
            {repoInput}
            {hostedInput}
            {descriptionInput}
            <input type="submit" value={'Update'} />
        </form>
    )
};
export default ProjectForm;
