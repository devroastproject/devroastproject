import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/UserContext";
import CommentPanel from "../Comment/CommentPanel";
import { callApi } from "../../services/callAPI";
import ProjectDetail from "./ProjectDetail";
import ProjectForm from "./ProjectForm";
import Message from "../Message";
import {Button, IconButton} from "@mui/material";
import {EditOutlined, CancelOutlined, DeleteForeverOutlined, DeleteOutlineOutlined} from '@mui/icons-material';

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
                <div> 
                    { edit ? <ProjectForm project={project}/> : <ProjectDetail project={project}/>}
                    {user.info && (user.info.id === project.user) ?
                    <div className='projButtons'>
                        <Button onClick={() => {setEdit(!edit)}}> { edit ? 
                            <div className="EditButtons">
                                <CancelOutlined /> 
                                <Button disabled={deleting} onClick={() => {setDeleting(true)}}><DeleteOutlineOutlined /></Button>
                            </div> :
                            <EditOutlined /> }
                        </Button>
                        {deleting ? 
                            <div className="DeleteConfirm">
                                <p>Are You Sure You Want To Delete?</p>
                                <Button onClick={() => {deleteProject()}}><DeleteForeverOutlined /></Button>
                                <Button onClick={() => {setDeleting(false)}}><CancelOutlined /></Button>
                            </div>
                        : null}
                    </div>
                    : null} 
                </div>
                <CommentPanel project={project}/>
            </>
            : 'loading'}
        </div>
    )
};
export default ProjectPage;
