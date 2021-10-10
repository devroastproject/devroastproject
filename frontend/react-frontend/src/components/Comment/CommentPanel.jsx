import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import CommentForm from "../Comment/CommentForm";
import CommentWrapper from "./CommentWrapper";

const CommentPanel = ({project}) => {
    
    const {comments} = project
    const [newComment, setNewComment] = useState(false)
    const {user} = useContext(UserContext)

    return (
        <div className='prevPanel'>
            <h3>Comments</h3>
            {newComment ? <CommentForm comment={null} project={project} /> : null}
            {user.info ? <button onClick={() => setNewComment(!newComment)}> {newComment ? 'Cancel': 'New Comment'} </button> : null}
            {comments.length > 0 ? comments.map((comment) => 
            <div key={comment.id}>
                <CommentWrapper comment={comment} project={project}/>
                <p>{null}</p>
            </div>)
            : 'No Comments Yet'}
        </div>
    )
}

export default CommentPanel;
