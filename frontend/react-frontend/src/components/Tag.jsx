import React from "react";

const Tag = ({tag}) => {
    const {tagname} = tag

    return(
        <div>
            <p>{tagname}</p>      
        </div>
    )
};

export default Tag;
