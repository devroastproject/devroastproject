import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const AvatarButton = ({username}) => {

    return (
        <Button>
            <Avatar sx={{'marginRight': '5px'}} alt={username} src="http://localhost:8000/staticfiles/monkeygun.jpg" />
            <Typography>{username}</Typography>
        </Button>
    );
}

export default AvatarButton;