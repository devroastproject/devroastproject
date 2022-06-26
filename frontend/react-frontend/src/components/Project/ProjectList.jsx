import React, {useState, useEffect} from "react";
import { callApi } from "../../services/callAPI";
import ProjectPreview from "./ProjectPreview";
import Loading from "../Utils/Loading";

import Stack from '@mui/material/Stack';

const ProjectList = () => {
    
    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        (async () => {
            let res = await callApi("projects/", "GET")
            let data =  JSON.parse(JSON.stringify(res))
            if (Array.isArray(data)){
                setProjects(data)
            }
        })()
    },[])

    return(
        <Stack id="ProjectList"> 
            { projects ? 
                projects.map((project) => <ProjectPreview key={project.id} project={project}/>)
            : <Loading /> } 
        </Stack>
    )
};

export default ProjectList;