import React from "react";
import Chip from '@mui/material/Chip';

const Tag = ({tag, onClick, clickable, assigned=false}) => {
    
    const {tagname} = tag

    return(
        <Chip label={tagname} variant={assigned ? 'filled' : 'outlined'} onClick={onClick} clickable={clickable} />
    )
};

export default Tag;
