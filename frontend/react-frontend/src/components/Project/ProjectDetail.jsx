import AvatarButton from "../Utils/AvatarButton";
import TagWidget from "../Tags/TagWidget";
import React from "react";

import StorageIcon from '@mui/icons-material/Storage';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import Box from "@mui/system/Box";

const ProjectDetail = ({project}) => {

    const {id, title, cover, description, user, username, repo_url, hosted_url, tags, avatar} = project
    
    function prepURL(url){
        let prepped = ' ' + url.replace(/(^\w+:|^)\/\//, '').slice(0, 17);
        prepped = prepped.length > 16 ? prepped + '...' : prepped
        return prepped
    } 
 
    return(
            <Grid sx={{padding: '6px'}} spacing={2} container className="ProjectDetail">
                <Grid item xs={12}>
                    <Typography variant="h3" style={{wordWrap: 'break-word'}}>{title}</Typography>
                </Grid>
                { cover &&
                    <Grid item xs={12}>
                        <Box component='img' 
                            src={`http://localhost:8000${cover}`} 
                            alt='' 
                            sx={{
                                'maxWidth': {xs:'250px', md: '500px'}, 
                                'height': 'auto'
                        }}/>
                    </Grid>
                }
                <Grid item>
                    <AvatarButton id={user} username={username} avatar={avatar}/>
                </Grid>
                {repo_url ? 
                    <Grid item>
                        <Button href={repo_url} target="_blank" rel="noreferrer noopener" startIcon={<GitHubIcon />}>
                            { prepURL(repo_url)}
                        </Button>
                    </Grid>
                : null }
                {hosted_url ? 
                <Grid item>
                    <Button href={hosted_url} target="_blank" rel="noreferrer noopener" startIcon={<StorageIcon />}>
                        { prepURL(hosted_url)}
                    </Button>
                </Grid>
                : null }
                <Grid item xs={12}>
                    <TagWidget tags={tags} project_id={id} username={username}/>
                </Grid>
                <Grid item xs={12}>
                <Typography style={{wordWrap: 'break-word'}}>{description}</Typography>
                </Grid>
            </Grid>
    )
};
export default ProjectDetail;
