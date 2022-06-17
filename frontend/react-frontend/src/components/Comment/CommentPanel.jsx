import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import CommentForm from "../Comment/CommentForm";
import CommentWrapper from "./CommentWrapper";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const CommentPanel = ({project}) => {
    
    const {comments} = project
    const [newComment, setNewComment] = useState(false)
    const {user} = useContext(UserContext)

    return (
        <Stack className='prevPanel'>
            {user.info ? 
                <Button 
                    onClick={() => setNewComment(!newComment)} 
                    startIcon={newComment ? <CancelOutlined /> : <AddOutlinedIcon />}
                    variant='contained'> 
                        {newComment ? 'Cancel': 'New Comment'} 
                </Button> : null}
            {newComment ? <CommentForm comment={null} project={project} /> : null}
            {comments && comments.length > 0 ? comments.map((comment) => 
            <div className="thread" key={comment.id}>
                <CommentWrapper comment={comment} project={project}/>
                <p>{null}</p>
            </div>)
            : 'No Comments Yet'}
        </Stack>
    )
}

export default CommentPanel;
