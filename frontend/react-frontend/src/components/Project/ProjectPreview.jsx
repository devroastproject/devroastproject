import { Link } from "react-router-dom";
import React from "react";

const ProjectPreview = ({project}) => {
    const {id, title, description, username, comments} = project
    return(
        <div className="preview">
            <Link to={{pathname: `project/${id}`, query: {"id": id}}}> <h3>{title}</h3> </Link>
            <p>{description}</p>
            <p>by {username}</p>
            <p>{comments.length} conversations</p>
        </div>
    )
};
export default ProjectPreview;
