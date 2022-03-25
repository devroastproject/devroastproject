import React from "react";
import Tag from "./Tag";

const TagList = ({tags}) => {
    return(
        <div className="TagList">
            {tags && tags.length > 0 ? tags.map((tag) => 
                { return tag.assigned ? 
                  <Tag tag={tag} key={tag.id}/>
                : null }    
            )
            : null }    
        </div>
    )
};

export default TagList;
