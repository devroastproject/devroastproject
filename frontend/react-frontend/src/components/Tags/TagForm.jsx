import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import TagButton from "./TagButton";

const TagForm = ({tags, project_id, comment_id}) => {
    
    const {user} = useContext(UserContext)
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        (async () => {
            const res = await callApi('tags/', 'GET', null, user.token)
            let tagIDs = tags.map((tag) => {return tag.id})
            let resTags = res.map((tag) => { tag.assigned = tagIDs.indexOf(parseInt(tag.id)) >= 0; return tag })
            console.log(resTags)
            setAllTags(resTags)
        })()
    }, [])

    const assignTags = async (tag) => {
        let method = 'PUT'
        let url = `tags/${tag.id}/`
        let data = {
            "id": tag.id,
            "comment": comment_id,
            "assigned": tag.assigned
         }
        
        const res = await callApi(url, method, data, user.token)
        // update local state to update UI
        if (res.code >= 200){
            let newTags = allTags.map((allTag) => {if (allTag.id === tag.id) { allTag.assigned = !allTag.assigned} return allTag})
            setAllTags(newTags)
        } 
    }

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