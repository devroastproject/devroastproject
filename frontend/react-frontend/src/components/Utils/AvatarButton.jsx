import { Link } from "react-router-dom";
import React from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

const AvatarButton = ({id, username, avatar}) => {

    return (
        <Button component={Link}
            to={{pathname: `/profile/${id}`, query: {"id": id}}} style={{ textDecoration: 'none' }}
        >
            <Avatar sx={{'marginRight': '5px'}} alt={username} src={`http://localhost:8000${avatar}`} />
            <Typography>{username}</Typography>
        </Button>
    );
}

export default AvatarButton;