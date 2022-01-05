import React from "react";
import Tag from "./Tag";

const TagList = ({tags}) => {
    return(
        <div className="TagList">
            {tags && tags.length > 0 ? tags.map((tag) => 
                <Tag tag={tag} key={tag.id}/>    
            )
            : null }    
        </div>
    )
};

export default TagList;
