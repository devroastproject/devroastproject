import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import { useHistory } from "react-router";
import Message from "../Utils/Message";
import { useInput } from "../Utils/useInput";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

const CommentForm = ({comment, project, reply=false}) => {

    let history = useHistory()

    let url = "comments/", method = "POST"
    // if creating new comment
    if (!Boolean(comment)){
        comment = {"body": "", "post": project.id, "prompt": null, "closed": false}
    // if replying to a prompt
    } else if (reply){
        comment = {"body": "", "post": project.id, "prompt": comment.id, "closed": false}
    // if editing an existing comment
    } else {
        url = `comments/${comment.id}/`  
        method = "PUT" 
    }

    const {user, setUser} = useContext(UserContext)
    const [closed, setClosed] = useState(comment.closed)
    const [body, bodyInput] = useInput({type: 'text', label: 'Comment', defaultValue: comment.body, multiline: true});

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
            "closed": closed,
        }
        
        const res = await callApi(url, method, data, user.token)
        if (res.code >= 200 || res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)           // refresh page on post success
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }
    
    return (
        <Container maxWidth="sm" className='CommentForm'>
            <form onSubmit={updateComment}>
                <Stack spacing={1}>
                    {bodyInput}
                    { comment.prompt === null && comment.id ?
                        <FormControlLabel control={
                            <Checkbox checked={Boolean(closed)} onChange={() => setClosed(!closed)} id="ClosedCheck" />
                        } label="Closed" />
                    : null}
                    <Button type="submit" variant="contained" disabled={!body} id='CommentSubmitButton'> {'SUBMIT'}</Button>
                </Stack>
            </form>
        </Container>
    )
}

export default CommentForm;
