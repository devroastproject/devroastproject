import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import TagForm from "./TagForm";
import TagList from "./TagList";

const TagWidget = ({tags, project_id, comment_id, username, closed}) => {

    const {user} = useContext(UserContext)
    const [allTags, setAllTags] = useState([])
    const [assigning, setAssigning] = useState(false)

    // on load, check all tags (stored in user context) to see if they are assigned
    useEffect(() => {
        let tagIDs = tags.map((tag) => {return tag.id})
        let resTags = user.tags.map((tag) => {
            let newTag = {...tag} // save local copy of tags with 'assigned' flag
            newTag.assigned = tagIDs.indexOf(parseInt(newTag.id)) >= 0
            return newTag })
        setAllTags(resTags)
    }, [user])

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
                <TagForm tags={allTags} assignTags={assignTags}/> 
            :   <TagList tags={allTags} />
            }
            { user.info && !closed && username === user.info.username ? 
                <button onClick={() => {setAssigning(!assigning)}}>
                    {assigning ? "Done" : "Modify"}
                </button> 
            : null}
        </div>
    )
};

export default TagWidget;
