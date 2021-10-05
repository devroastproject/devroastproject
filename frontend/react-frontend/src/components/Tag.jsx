import React from "react";

const Tag = ({tag}) => {
    const {id, tagname, description} = tag

    return(
        <div>
            <p>{tagname}</p>      
        </div>
    )
};

export default Tag;
