import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/UserContext";
import CommentPanel from "../Comment/CommentPanel";
import { callApi } from "../../services/callAPI";
import ProjectDetail from "./ProjectDetail";
import ProjectForm from "./ProjectForm";
import Message from "../Message";
import Loading from "../Loading";
import Button from "@mui/material/Button";
import EditOutlined from '@mui/icons-material/EditOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const ProjectPage = () => {
    let params = useParams()
    let history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [project, setProject] = useState(null)
    const [edit, setEdit] = useState(false)
    const [deleting, setDeleting] = useState(false)
    
    useEffect(() => {
        if (!project) {
          (async () => {
            const detail = await callApi(`projects/${params.id}/`, "GET")
            if (detail.code === 404){    // if item has been deleted, go to home
                history.push('/') 
            } else {
                setProject(detail)
            }
          })()
        }
    });

    const deleteProject = async () => {
            
            const res = await callApi(`projects/${project.id}/`, "DELETE", project, user.token)
            
            if (res.code >= 200 || res.code < 300){    // forward to home on success
                setUser({...user, message: <Message message={res.message} type="success"/>})   
                history.push("/")
            } else {
                setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
            }
    }

    return(
        <div className='ProjectPage'>
            { project ? 
            <>
                <Grid container> 
                    <Grid item xs={11}>
                        { edit ? <ProjectForm project={project}/> : <ProjectDetail project={project}/>}
                    </Grid>
                    <Grid item xs={1}>
                        {user.info && (user.info.id === project.user) ?
                            <Stack spacing={2} className='projButtons'>
                                { deleting ? 
                                    <Stack className="DeleteConfirm">
                                        <Button onClick={() => {setDeleting(false)}} startIcon={<CancelOutlined />}>Cancel Delete</Button> 
                                        <Button onClick={() => {deleteProject()}} startIcon={<DeleteForeverOutlined />} color={'error'}>Delete Forever</Button>
                                    </Stack>
                                : edit ?
                                    <Stack className="EditButtons">
                                        <Button onClick={() => {setEdit(!edit)}}>  
                                            <CancelOutlined /> 
                                        </Button> 
                                        <Button disabled={deleting} onClick={() => {setDeleting(true)}}><DeleteOutlineOutlined /></Button>
                                    </Stack> 
                                :
                                <Button onClick={() => {setEdit(!edit)}}>  
                                    <EditOutlined /> 
                                </Button> }
                            </Stack>
                        : <Loading />}
                    </Grid>
                </Grid>
                <CommentPanel project={project}/>
            </>
            : <Loading />}
        </div>
    )
};
export default ProjectPage;
