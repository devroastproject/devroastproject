import AvatarButton from "../Utils/AvatarButton";
import TagWidget from "../Tags/TagWidget";
import React from "react";

import StorageIcon from '@mui/icons-material/Storage';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

const ProjectDetail = ({project}) => {

    const {id, title, description, username, repo_url, hosted_url, tags} = project
    
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
                <Grid item>
                    <AvatarButton username={username}/>
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
