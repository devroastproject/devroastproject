import React from "react";
import Tag from "./Tag";
import Grid from '@mui/material/Grid';

const TagList = ({tags}) => {
    return(
        <Grid container spacing={1} className="TagList">
            {tags && tags.length > 0 ? tags.map((tag) => 
                { return tag.assigned ? 
                    <Grid key={tag.id} item>
                        <Tag tag={tag} />
                    </Grid>
                : null }    
            )
            : null }    
        </Grid>
    )
};

export default TagList;
