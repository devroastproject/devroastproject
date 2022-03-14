import CommentPanel from "../Comment/CommentPanel";
import React from "react";
import TagList from "../Tags/TagList";
import TagWidget from "../Tags/TagWidget";

const ProjectDetail = ({project}) => {

    const {id, title, description, username, repo_url, hosted_url, tags} = project
    
    return(
        <div>
            <h1>{title}</h1> 
            <p>by {username}</p>
            <a href={repo_url} target="_blank" rel="noreferrer noopener"> <p>Git</p></a>
            <a href={hosted_url} target="_blank" rel="noreferrer noopener"><p>Demo</p></a>
            <p>{description}</p>
            <TagWidget tags={tags} project_id={id} username={username}/>
            <CommentPanel project={project}/>
        </div>
    )
};
export default ProjectDetail;
