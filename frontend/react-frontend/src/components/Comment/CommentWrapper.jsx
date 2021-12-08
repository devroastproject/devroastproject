import UserContext from "../../context/UserContext";
import React, {useState, useContext} from "react";
import { callApi } from "../../services/callAPI";
import { useHistory } from "react-router";
import CommentForm from "./CommentForm";
import Message from "../Message";
import Comment from "./Comment";

const CommentWrapper = ({comment, project}) => {

    const {replies, username} = comment
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [replying, setReplying] = useState(false)

    const deleteComment = async () => {
            
        const res = await callApi(`comments/${comment.id}/`, "DELETE", comment, user.token)
        if (res.code >= 200 || res.code < 300){    
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
        }
    }

    return(
        <>
            {editing ? <CommentForm comment={comment} project={project}/> : <Comment comment={comment}/> /* switch between displaying the comment or edit form*/}
            { user.info && user.info.username === username ? /* show Edit and Delete buttons to author of comments only*/
            <>
                <button onClick={() => {setEditing(!editing)}}>{editing ? "Cancel" : "Edit"}</button>
                <button disabled={deleting} onClick={() => {setDeleting(true)}}>Delete</button>
                {deleting ? /* Confirm Delete buttons*/
                <>
                    <p>Are You Sure You Want To Delete?</p>
                    <button onClick={() => {deleteComment()}}> Confirm Delete</button>
                    <button onClick={() => {setDeleting(false)}}>Cancel</button>
                </> : null}
            </> : null}
            {/* Render reply thread */}
            {replies.map((reply) => <CommentWrapper key={reply.id} comment={reply} project={project}/>)}
            {!comment.prompt ? /* display Reply button on prompt comments*/
            <>
                { replying ?
                    <CommentForm comment={comment} project={project} reply={true}/>
                : null}
                {user.info && !comment.closed ? <button onClick={() => {setReplying(!replying)}}>{replying ? "Cancel" : "Reply"}</button> : null}
            </> : null} 
        </>
    )
}

export default CommentWrapper;