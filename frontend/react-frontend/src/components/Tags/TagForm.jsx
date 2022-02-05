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
            res.map((tag) => { 
                tag.assigned = tagIDs.indexOf(parseInt(tag.id)) >= 0 
            })
            setAllTags(res)
        })()
    })

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
            let newTags = [...allTags]
            let i = allTags.findIndex(obj => obj['id'] === tag.id)
            newTags[i]['assigned'] = !newTags[i]['assigned']
            setAllTags(newTags)
        } 
    }

    return(
        <> {
            allTags.length > 0 ? 
            allTags.map((tag) => <TagButton tag={tag} key={tag.id} assignTags={assignTags}/>)
            : 'waiting...' 
        } </>
    )
};

export default TagForm;