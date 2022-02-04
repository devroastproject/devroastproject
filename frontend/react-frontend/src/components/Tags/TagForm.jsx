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
            console.log(res)
            setAllTags(res)
        })()
    }, [])

    const assignTags = async (tag) => {
        // PUT new tag assignment
        let method = 'PUT'
        //  let url = 'tags/'
        let url = `tags/${tag.id}/`
        let data = {
             "id": tag.id,
            //  "project": project_id,
             "comment": comment_id,
            //  "tagname": tag.tagname,
            //  "description": tag.description
            "assigned": tag.assigned
         }
        // DELETE current vote
        // if (tag.assigned) {
            // url = `tags/${tag.id}/`
            // data['project'] = null
            // data['comment'] = null
        // }
        
        const res = await callApi(url, method, data, user.token)
        console.log(res)
        // update local state to update UI
        if (res.code >= 200){   // PUT result
        console.log('put succeed')
        } else if (res.code === 204) { // DELETE result
        console.log('delete succeed')
        }
    }

    return(
        <>
        {
            allTags.length > 0 ? 
            allTags.map((tag) => <TagButton tag={tag} key={tag.id} assignTags={assignTags}/>)
            : 'waiting...' 
        }  
        </>
    )
};

export default TagForm;