import React, {useState, useEffect} from "react";
import ProjectPreview from "./ProjectPreview";
import { callApi } from "../services/api";

const Projects = () => {
    
    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        (async () => {
            let res = await callApi("projects/", "GET")
            let data =  JSON.parse(JSON.stringify(res))
            setProjects(data)
        })()
    },[])

    return(
        <> { projects ? <div className="prevPanel"> {projects.map((project) => <ProjectPreview key={project.id} project={project}/>)}</div> : "loading" } </>
    )
};

export default Projects;