import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import { useHistory } from "react-router";
import Message from "../Message";


const CommentForm = ({comment, project, reply=false}) => {

    let history = useHistory()

    let url = "comments/", method = "POST"
    // if creating new comment
    if (!Boolean(comment)){
        comment = {"body": "", "post": project.id, "prompt": null, "neg_votes": 0, "pos_votes": 0, "closed": false}//, "tags": []}
    // if replying to a prompt
    } else if (reply){
        comment = {"body": "", "post": project.id, "prompt": comment.id, "neg_votes": 0, "pos_votes": 0, "closed": false}//, "tags": []}
    // if editing an existing comment
    } else {
        url = `comments/${comment.id}/`  
        method = "PUT" 
    }

    const {user, setUser} = useContext(UserContext)
    const [body, setBody] = useState(comment.body)
    // const [tags, setTags] = useState(comment.tags)

    const updateComment = async e => {
        e.preventDefault()
        let data = {
            "id": comment.id,
            "post": comment.post,
            "user": user.info.id,
            "prompt": comment.prompt,
            "body": body,
            "neg_votes": comment.neg_votes,
            "pos_votes": comment.pos_votes,
            "closed": comment.closed,
            // "tags": tags
        }
        
        const res = await callApi(url, method, data, user.token)
        if (res.code >= 200 || res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)           // refresh page on post success
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
        }
    }
    
    return (
        <div>
            <form onSubmit={updateComment}>
                <label> New Comment 
                    <textarea defaultValue={comment.body} onChange={e => setBody(e.target.value)}></textarea>
                </label> 
                
                {/* <label htmlFor='tags' > Choose a Tag 
                    <select name="tags" id="tags" onChange={e => setTags(e.target.value)}>
                        {commentOptions.map((tag) => <option key={tag.id} value={tag.id}>{tag.tagname}</option>)}
                    </select>
                </label> */}
                
                <br/>
                <input type="submit" value={'Submit'} disabled={!body}/>
            </form>
        </div>
    )
}

export default CommentForm;
