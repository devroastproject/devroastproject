import { Link } from "react-router-dom";
import React from "react";
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import Grid from '@mui/material/Grid';
import Tag from "../Tags/Tag";

const ProjectPreview = ({project}) => {

    const {id, title, description, username, comment_count, tags} = project

    return(
        <Card variant="outlined">
            <Grid container spacing={1} sx={{padding: '6px'}}>
                <Grid item xs={12}>
                    <Link to={{pathname: `project/${id}`, query: {"id": id}}} style={{ textDecoration: 'none' }}>
                        <Typography variant='h5'>{title}</Typography>
                    </Link>
                </Grid>
                <Grid item xs={12}>
                    <Typography noWrap>{description}</Typography>
                </Grid>
                <Grid container item direction='row' spacing={1} xs={12} alignItems="center" >
                    <Grid item>
                        <Button>
                            <Avatar sx={{'marginRight': '5px'}} alt={username} src="http://localhost:8000/staticfiles/monkeygun.jpg" />
                            <Typography>{username}</Typography>
                        </Button>
                    </Grid>
                    <Grid item>
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
