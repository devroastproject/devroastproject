import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/UserContext";
import CommentPanel from "../Comment/CommentPanel";
import { callApi } from "../../services/callAPI";
import DeleteButtons from "../Utils/DeleteButtons";
import EditButtons from "../Utils/EditButtons"
import ProjectDetail from "./ProjectDetail";
import ProjectForm from "./ProjectForm";
import Message from "../Utils/Message";
import Loading from "../Utils/Loading";

import EditOutlined from '@mui/icons-material/EditOutlined';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    return(
        <div className='ProjectPage'>
            { project ? 
            <Paper elevation={0}>
                <Paper elevation={1}>
                    <Grid container > 
                        <Grid item xs={10} sm={11}>
                            { edit ? <ProjectForm project={project}/> : <ProjectDetail project={project}/>}
                        </Grid>
                        <Grid item xs={1}>
                            {user.info && (user.info.id === project.user) ?
                                <Stack spacing={2} id='projButtons'>
                                    { deleting ? 
                                        <DeleteButtons deleting={deleting} setDeleting={setDeleting} deleteMethod={deleteProject} />
                                    : edit ?
                                        <EditButtons edit={edit} setEdit={setEdit} deleting={deleting} setDeleting={setDeleting} />
                                    :
                                    <Button onClick={() => {setEdit(!edit)}}>  
                                        <EditOutlined /> 
                                    </Button> }
                                </Stack>
                            : null}
                        </Grid>
                    </Grid>
                </Paper>
                <CommentPanel project={project}/>
            </Paper>
            : <Loading />}
        </div>
    )
};
export default ProjectPage;
