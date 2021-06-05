import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router";
import UserContext from "../../context/UserContext";
import ProjectDetail from "./ProjectDetail";
import { callApi } from "../../services/callAPI";
import ProjectForm from "./ProjectForm";
import Message from "../Message";

const ProjectPage = () => {
    let params = useParams()
    let history = useHistory()
    const {user, setUser} = useContext(UserContext)
    const [project, setProject] = useState(null)
    const [edit, setEdit] = useState(false)
    
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
        let check = window.confirm(`Are you sure you want to delete ${project.title}`)
        
        if (check) {
            
            const res = await callApi(`projects/${project.id}/`, "DELETE", project, user.token)
            
            if (res.code >= 200 || res.code < 300){    // forward to home on success
                setUser({...user, message: <Message message={res.message} type="success"/>})   
                history.push("/")
            } else {
                setUser({...user, message: <Message message="Something Went Wrong" type="failure"/>})   
            }
        }
    }

    return(
        <div className='ProjectPage'>
            { project ? 
            <>
                { edit ? <ProjectForm project={project}/> : <ProjectDetail project={project}/>} 
                {user.info && (user.info.id === project.user) ?
                <>
                    <button onClick={() => {setEdit(!edit)}}>{edit ? "Cancel" : "Edit"}</button>
                    <button onClick={() => {deleteProject()}}>Delete</button>
                </>
                 : null} 
            </>
            : 'loading'}
        </div>
    )
};
export default ProjectPage;
