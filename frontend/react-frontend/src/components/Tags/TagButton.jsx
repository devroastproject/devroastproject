import React from "react";
import Tag from "./Tag";

const TagButton = ({tag, assignTags}) => {
    return(
        <div className="TagButton" 
        style={ tag.assigned === true ? { backgroundColor: 'green' } : { backgroundColor: 'none' }}
        onClick={() => assignTags(tag)}>
                <Tag tag={tag} key={tag.id}/>    
        </div>
    )
};

export default TagButton;