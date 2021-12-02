import { Link } from "react-router-dom";
import React from "react";

const ProjectPreview = ({project}) => {
    const {id, title, description, username, comment_count} = project
    return(
        <div className="preview">
            <Link to={{pathname: `project/${id}`, query: {"id": id}}}> <h3>{title}</h3> </Link>
            <p>{description}</p>
            <p>by {username}</p>
            <p id={`${id}_comment_count`}>{comment_count} comment{comment_count > 1 ? 's' : null}</p>
        </div>
    )
};
export default ProjectPreview;
