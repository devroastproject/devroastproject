import React, {useEffect, useState, useContext} from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import TagForm from "./TagForm";
import TagList from "./TagList";

import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

const TagWidget = ({tags, project_id = null, comment_id = null, username, closed=false}) => {

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const assignTags = async (tag) => {

        let data = {
            "id": tag.id,
            "assigned": tag.assigned
         }
        if (comment_id){
            data.comment = comment_id
        } else if (project_id) {
            data.project = project_id
        }

        const res = await callApi(`tags/${tag.id}/`, 'PUT', data, user.token)

        // update local state to update UI on success
        if (res.code >= 200){
            let newTags = allTags.map((allTag) => {if (allTag.id === tag.id) { allTag.assigned = !allTag.assigned} return allTag})
            setAllTags(newTags)
        } 
    }

    return(
            <Stack direction='row' spacing={1} className="TagWrapper">
                { user.info && !closed && username === user.info.username ? 
                    <IconButton onClick={() => {setAssigning(!assigning)}}>
                        {assigning ? <CancelOutlined /> : <LocalOfferOutlinedIcon />}
                    </IconButton> 
                : null}
                { assigning ? 
                    <TagForm tags={allTags} assignTags={assignTags}/> 
                :   <TagList tags={allTags} />
                }
            </Stack>
    )
};

export default TagWidget;
