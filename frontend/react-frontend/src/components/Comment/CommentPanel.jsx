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
        <Stack spacing={2} className='prevPanel'>
            <Button 
                onClick={() => setNewComment(!newComment)} 
                startIcon={newComment ? <CancelOutlined /> : <AddOutlinedIcon />}
                variant='contained'
                disabled={user.info ? false : true}> 
                    {newComment ? 'Cancel': 'New Comment'} 
            </Button> 
            {newComment ? <CommentForm comment={null} project={project} /> : null}
            {comments && comments.length > 0 ? comments.map((comment) => 
                <CommentWrapper key={comment.id} comment={comment} project={project}/>)
            : null}
        </Stack>
    )
}

export default CommentPanel;
