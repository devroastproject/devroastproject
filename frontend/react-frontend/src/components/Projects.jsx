import React, {useState, useContext, useEffect} from "react";
import UserContext from "../context/UserContext";
import { callApi } from "../services/api";

const Projects = () => {
    // user context
    const {user} = useContext(UserContext) // user info
    
    const [projects, setProjects] = useState(null)

    useEffect(()=>{
        if (user.token) {
            (async () => {
                let res = await callApi("projects/", "GET")
                console.log(JSON.stringify(res))
                setProjects(res)
            })()
        }    
    },[user.token])

    return(
        <> { projects ? projects.map((project) => <p>{project.title}</p>) : <h1>Projects</h1> } </>
    )
};

export default Projects;