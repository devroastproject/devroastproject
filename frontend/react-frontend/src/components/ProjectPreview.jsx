import React from "react";

const ProjectPreview = ({project}) => {
    const {title, repo_url, hosted_url, description, user} = project
    return(
        <div>
            <ul>
                <li>{title}</li>
                <li>{repo_url}</li>
                <li>{hosted_url}</li>
                <li>{description}</li>
                <li>{user}</li>
            </ul>
        </div>
    )
};
export default ProjectPreview;
