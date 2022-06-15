import TagWidget from "../Tags/TagWidget";
import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import StorageIcon from '@mui/icons-material/Storage';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ProjectDetail = ({project}) => {

    const {id, title, description, username, repo_url, hosted_url, tags} = project
    
    function prepURL(url){
        let prepped = ' ' + url.replace(/(^\w+:|^)\/\//, '').slice(0, 17);
        prepped = prepped.length > 16 ? prepped + '...' : prepped
        return prepped
    } 
 
    return(
            <Grid sx={{padding: '6px'}} container className="ProjectDetail">
                <Grid item xs={12}>
                    <Typography variant="h3">{title}</Typography>
                </Grid>
                <Stack direction='row' spacing={2}>
                    <Button>
                    <Stack>
                        <Avatar alt="Remy Sharp" src="http://localhost:8000/staticfiles/monkeygun.jpg" />
                        <Typography>{username}</Typography>
                    </Stack>
                    </Button>
                    <Box>
                        <Button href={repo_url} target="_blank" rel="noreferrer noopener" startIcon={<GitHubIcon />}>
                            { prepURL(repo_url)}
                        </Button>
                        <Button href={hosted_url} target="_blank" rel="noreferrer noopener" startIcon={<StorageIcon />}>
                            { prepURL(hosted_url)}
                        </Button>
                    </Box>
                </Stack>
                <Grid item xs={12}>
                    <TagWidget tags={tags} project_id={id} username={username}/>
                </Grid>
                <Grid item xs={12}>
                    <p>{description}</p>
                </Grid>
            </Grid>
    )
};
export default ProjectDetail;
