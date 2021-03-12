import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import { callApi } from "../services/api";
import ProjectPreview from "./ProjectPreview";

const Projects = () => {
    // user context
    const {user} = useContext(UserContext) // user info
    
    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        if (user.token && !projects) {
            (async () => {
                let res = await callApi("projects/", "GET")
                let data =  JSON.parse(JSON.stringify(res))
                setProjects(data)
            })()
        }    
    },[user.token, projects])

    return(
        <> { projects ? <div className="prevPanel"> {projects.map((project) => <ProjectPreview key={project.id} project={project}/>)}</div> : <h1>Projects</h1> } </>
    )
};

export default Projects;