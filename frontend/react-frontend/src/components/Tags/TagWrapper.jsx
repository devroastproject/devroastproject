import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import TagForm from "../Tags/TagForm";
import TagList from "./TagList";

const TagWrapper = ({tags, project_id, comment_id, username, closed}) => {

    const {user} = useContext(UserContext)
    const [allTags, setAllTags] = useState([])
    const [assigning, setAssigning] = useState(false)

    useEffect(() => {
        (async () => {
            const res = await callApi('tags/', 'GET', null, user.token)
            let tagIDs = tags.map((tag) => {return tag.id})
            let resTags = res.map((tag) => { tag.assigned = tagIDs.indexOf(parseInt(tag.id)) >= 0; return tag })
            setAllTags(resTags)
        })()
    }, [assigning])

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

    return(
        <div className="TagWrapper">
            { assigning ? 
                <TagForm allTags={allTags} assignTags={assignTags} setAllTags={setAllTags}/> 
            :   <TagList tags={tags} />
            }
            { user.info && !closed && username === user.info.username ? 
                <button onClick={() => {setAssigning(!assigning)}}>
                    {assigning ? "Done" : "Modify"}
                </button> 
            : null}
        </div>
    )
};

export default TagWrapper;
