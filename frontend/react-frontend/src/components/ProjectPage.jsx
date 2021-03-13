import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { callApi } from "../services/api";
import ProjectForm from "./ProjectForm";
import UserContext from "../context/UserContext";
import ProjectDetail from "./ProjectDetail";

const ProjectPage = () => {
    let params = useParams()
    const {user, setUser} = useContext(UserContext)
    const [project, setProject] = useState(null)
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        if (!project) {
          (async () => {
            const detail = await callApi(`projects/${params.id}/`, "GET")
            setProject(detail)
          })()
        }}, [project, params.id]);
    return(
        <>
            { project ? 
            <>
                { edit ? <ProjectForm project={project}/> : <ProjectDetail project={project}/>} 
                {/* {user.id == project.user ? */}
                <>
                    <button onClick={() => {setEdit(!edit)}}>Edit</button>
                    <button onClick={() => {setEdit(!edit)}}>Delete</button>
                </>
                {/* // : null} */}
            </>
            : 'loading'}
        </>
    )
};
export default ProjectPage;
