import AvatarButton from "../Utils/AvatarButton";
import { Link } from "react-router-dom";
import Tag from "../Tags/Tag";
import React from "react";

import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

const ProjectPreview = ({project}) => {

    const {id, title, description, user, username, comment_count, tags, avatar} = project

    return(
        <Card variant="outlined">
            <Grid container spacing={1} sx={{padding: '6px'}}>
                <Grid item xs={12}>
                    <Link to={{pathname: `/project/${id}`, query: {"id": id}}} style={{ textDecoration: 'none' }}>
                        <Typography variant='h5'>{title}</Typography>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Typography noWrap>{description}</Typography>
                </Grid>
                <Grid container item direction='row' spacing={1} xs={12} alignItems="center" >
                    <Grid item>
                        <AvatarButton id={user} username={username} avatar={avatar}/>
                    </Grid>
                    <Grid item id={`${id}_comment_count`}>
                        <Typography><InsertCommentOutlinedIcon />{comment_count}</Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction='row' spacing={1}>
                            {tags.length > 0 ?
                                tags.map((tag)=> 
                                <Grid item key={tag.id}>
                                    <Tag tag={tag} size='small'/>
                                </Grid>)
                            : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
};
export default ProjectPreview;
