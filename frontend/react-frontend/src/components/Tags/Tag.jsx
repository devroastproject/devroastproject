import React from "react";

import Chip from '@mui/material/Chip';

const Tag = ({tag, onClick=()=>{}, clickable=false, assigned=false, size='medium'}) => {
    
    const {tagname} = tag

    return(
        <Chip label={tagname} variant={assigned ? 'filled' : 'outlined'} onClick={onClick} clickable={clickable} size={size} />
    )
};

export default Tag;
