import React from "react";

const Tag = ({tag}) => {
    
    const {tagname} = tag

    return(
        <div className="Tag">
            <p>{tagname}</p>      
        </div>
    )
};

export default Tag;
