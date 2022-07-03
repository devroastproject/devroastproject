import UserContext from "../../context/UserContext";
import DeleteButtons from "../Utils/DeleteButtons";
import React, {useState, useContext} from "react";
import { callApi } from "../../services/callAPI";
import AvatarButton from "../Utils/AvatarButton"
import EditButtons from "../Utils/EditButtons"
import VoteWidget from "../Vote/VoteWidget";
import TagWidget from "../Tags/TagWidget";
import { useHistory } from "react-router";
import CommentForm from "./CommentForm";
import Message from "../Utils/Message";

import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const CommentWrapper = ({comment, project, elevation=1}) => {

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
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    return(
        <Paper elevation={elevation}>
                <Paper elevation={2}>

            <Grid container  sx={{padding: '6px'}} direction='row'>
                    {/* Comment text and edit buttons */}
                    <Grid item xs={12} sm={11} >
                        {editing ? /* switch between displaying the comment or edit form*/
                            <CommentForm comment={comment} project={project}/> 
                        : 
                            <Typography> {closed ? <>CLOSED<br/></> : null} {body} </Typography>
                        }
                    </Grid>
                    <Grid item xs='auto' sm={1}> 
                        {user.info && (user.info.id === comment.user) ?
                        <>
                            { deleting ? 
                                <DeleteButtons deleting={deleting} setDeleting={setDeleting} deleteMethod={deleteComment} />
                            : editing ?
                                <EditButtons edit={editing} setEdit={setEditing} deleting={deleting} setDeleting={setDeleting} />
                            :
                                <Button onClick={() => {setEditing(!editing)}} id="EditButton">  
                                    <EditOutlined /> 
                                </Button> }
                        </>
                        : null}
                    </Grid>
                    {/* Avatar, tags and votes on lower line */}
                    <Grid item xs={12} sm='auto'>
                        <AvatarButton id={comment.user} username={username}/>
                    </Grid>
                    <Grid item>
                        <VoteWidget comment_id={id} votes={votes} closed={closed} />
                    </Grid>
                    <Grid item>
                        <TagWidget tags={tags} comment_id={id} username={username} closed={closed}/> 
                    </Grid>
            </Grid>
            </Paper>
                
            {/* Render reply thread */}
            <Grid container direction='row-reverse'>
                {replies.map((reply) => 
                    <Grid item  key={reply.id} justifyContent="space-between" xs={12} sm={11}>
                        <CommentWrapper comment={reply} project={project} elevation={2}/>
                    </Grid>
                )}
            </Grid>

            {!comment.prompt ? /* display Reply button on prompt comments*/
            <Stack>
                { replying ?
                    <Box sx={{marginTop: '8px'}} >
                        <CommentForm comment={comment} project={project} reply={true}/>
                    </Box>
                : null}
                {user.info && !closed ? 
                    <Button 
                        onClick={() => {setReplying(!replying)}}
                        startIcon={replying ? <CancelOutlined /> : <ReplyOutlinedIcon />}
                        variant='contained'
                        id="ReplyButton">
                            {replying ? "Cancel" : "Reply"}
                    </Button> 
                : null}
            </Stack> : null} 
        </Paper>
    )
}

export default CommentWrapper;