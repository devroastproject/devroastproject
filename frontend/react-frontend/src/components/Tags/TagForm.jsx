import React, {useState, useEffect} from "react";
import TagButton from "./TagButton";

const TagForm = ({tags, assignTags}) => {
   
    const [searchTerm, setSearchTerm] = useState('')
    const [matchTags, setMatchTags] = useState(tags)

    useEffect(() => {
        let matched = matchTags.map((tag) => { tag.searched = tag.tagname.includes(searchTerm) && searchTerm; return tag })
        setMatchTags(matched)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])

    return(
        <> 
            <label htmlFor="tagSearch"> Tags: 
                <input type="text" name="tagSearch" onChange={e => setSearchTerm(e.target.value)}/>
            </label>
        {
            matchTags.length > 0 ? 
            // display tags that are either assigned or are being searched for
            matchTags.map((tag) => tag.assigned || tag.searched ? <TagButton tag={tag} key={tag.id} assignTags={assignTags}/> : null)
            : 'waiting...' 
        } 
        </>
    )
};

export default TagForm;