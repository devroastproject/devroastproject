import UserContext from "../../context/UserContext";
import React, {useState, useContext} from "react";
import { callApi } from "../../services/callAPI";
import VoteWidget from "../Vote/VoteWidget";
import TagWidget from "../Tags/TagWidget";
import { useHistory } from "react-router";
import CommentForm from "./CommentForm";
import Message from "../Message";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import EditOutlined from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';

const CommentWrapper = ({comment, project}) => {

    const {id, votes, tags, username, closed, replies, body} = comment
    const history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [replying, setReplying] = useState(false)

    const deleteComment = async () => {
            
        const res = await callApi(`comments/${id}/`, "DELETE", comment, user.token)
        if (res.code >= 200 || res.code < 300){    
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
        }
    }

    return(
        <Paper elevation={1}>
            <Grid container  sx={{padding: '6px'}} direction='row'>

                {/* Comment text and edit buttons */}
                <Grid item xs={12} sm={11} >
                    {editing ? /* switch between displaying the comment or edit form*/
                        <CommentForm comment={comment} project={project}/> : <Typography> {closed ? <>CLOSED<br/></> : null} {body} </Typography>
                    }
                </Grid>
                <Grid item xs='auto' sm={1}> 
                    {user.info && (user.info.id === comment.user) ?
                    <>
                        { deleting ? 
                            <Stack className="DeleteConfirm">
                                <Button onClick={() => {setDeleting(false)}} startIcon={<CancelOutlined />}>Cancel Delete</Button> 
                                <Button onClick={() => {deleteComment()}} startIcon={<DeleteForeverOutlined />} color={'error'}>Delete Forever</Button>
                            </Stack>
                        : editing ?
                            <Stack className="EditButtons">
                                <Button onClick={() => {setEditing(!editing)}}>  
                                    <CancelOutlined /> 
                                </Button> 
                                <Button disabled={deleting} onClick={() => {setDeleting(true)}}><DeleteOutlineOutlined /></Button>
                            </Stack> 
                        :
                            <Button onClick={() => {setEditing(!editing)}}>  
                                <EditOutlined /> 
                            </Button> }
                    </>
                    : null}
                </Grid>

                {/* Avatar, tags and votes on lower line */}
                <Grid item xs={12} sm='auto'>
                    <Button>
                        <Avatar sx={{'marginRight': '5px'}} alt={username} src="http://localhost:8000/staticfiles/monkeygun.jpg" />
                        <Typography>{username}</Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <VoteWidget comment_id={id} votes={votes} closed={closed} />
                </Grid>
                <Grid item>
                    <TagWidget tags={tags} comment_id={id} username={username} closed={closed}/> 
                </Grid>
            </Grid>
                
            {/* Render reply thread */}
            <Grid container direction='row-reverse'>
                {replies.map((reply) => 
                    <Grid item  key={reply.id} justifyContent="space-between" xs={12} sm={11}>
                        <CommentWrapper comment={reply} project={project}/>
                    </Grid>
                )}
            </Grid>

            {!comment.prompt ? /* display Reply button on prompt comments*/
            <Stack>
                { replying ?
                    <CommentForm comment={comment} project={project} reply={true}/>
                : null}
                {user.info && !closed ? 
                    <Button 
                        onClick={() => {setReplying(!replying)}}
                        startIcon={replying ? <CancelOutlined /> : <ReplyOutlinedIcon />}
                        variant='contained'>
                            {replying ? "Cancel" : "Reply"}
                    </Button> 
                : null}
            </Stack> : null} 
        </Paper>
    )
}

export default CommentWrapper;