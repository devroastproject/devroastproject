import CommentPanel from "../Comment/CommentPanel";
import React from "react";

const ProjectDetail = ({project}) => {

    const {title, description, username, repo_url, hosted_url} = project
    
    return(
        <div>
            <h1>{title}</h1> 
            <p>by {username}</p>
            <a href={repo_url} target="_blank" rel="noreferrer noopener"> <p>Git</p></a>
            <a href={hosted_url} target="_blank" rel="noreferrer noopener"><p>Demo</p></a>
            <p>{description}</p>
            <CommentPanel project={project}/>
        </div>
    )
};
export default ProjectDetail;
