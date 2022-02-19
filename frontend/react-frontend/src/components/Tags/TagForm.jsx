import React from "react";
import TagButton from "./TagButton";

const TagForm = ({allTags, assignTags, setAllTags}) => {
    
    const searchTags = (term) => {
        // set flags on tags to show if being searched for
        let matched = allTags.map((tag) => { tag.searched = tag.tagname.includes(term) && term; return tag })
        setAllTags(matched)
    }

    return(
        <> 
            <label htmlFor="tagSearch"> Tags: 
                <input type="text" name="tagSearch" onChange={e => searchTags(e.target.value)}/>
            </label>
        {
            allTags.length > 0 ? 
            // display tags that are either assigned or are being searched for
            allTags.map((tag) => tag.assigned || tag.searched ? <TagButton tag={tag} key={tag.id} assignTags={assignTags}/> : null)
            : 'waiting...' 
        } 
        </>
    )
};

export default TagForm;