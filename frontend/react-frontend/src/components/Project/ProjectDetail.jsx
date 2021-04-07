import React from "react";

const ProjectDetail = ({project}) => {
    const {title, description, user, repo_url, hosted_url} = project
    return(
        <div>
            <h1>{title}</h1> 
            <p>by {user}</p>
            <a href={repo_url} target="_blank" rel="noreferrer noopener"> <p>Git</p></a>
            <a href={hosted_url} target="_blank" rel="noreferrer noopener"><p>Demo</p></a>
            <p>{description}</p>
        </div>
    )
};
export default ProjectDetail;
