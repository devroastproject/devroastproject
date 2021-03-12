import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { callApi } from "../services/api";

const ProjectDetail = () => {
    let params = useParams()
    const [project, setProject] = useState(null)
    useEffect(() => {
        if (!project) {
          (async () => {
            const detail = await callApi(`projects/${params.id}/`, "GET")
            setProject(detail)
          })()
        }}, [project, params.id]);              // trigger effect if user is modified
    return(
        <>
            { project ? 
            <div>
                <h1>{project.title}</h1> 
                <p>by {project.user}</p>
                <a href=""> <p> Git: {project.repo_url}</p></a>
                <a href=""><p>Demo: {project.hosted_url}</p></a>
                <p>{project.description}</p>
            </div>
            : 'loading'}
        </>
    )
};
export default ProjectDetail;
