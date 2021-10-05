import React from "react";
import Comment from "../Comment";

const ProjectDetail = ({project}) => {
    const {title, description, username, repo_url, hosted_url, comments} = project
    return(
        <div>
            <h1>{title}</h1> 
            <p>by {username}</p>
            <a href={repo_url} target="_blank" rel="noreferrer noopener"> <p>Git</p></a>
            <a href={hosted_url} target="_blank" rel="noreferrer noopener"><p>Demo</p></a>
            <p>{description}</p>
            <div className='prevPanel'>
                <h3>Comments</h3>
                {comments.length > 0 ? 
                    comments.map((comment) => <Comment key={comment.id} comment={comment}/>)
                : 'No Comments Yet'}
            </div>
        </div>
    )
};
export default ProjectDetail;
