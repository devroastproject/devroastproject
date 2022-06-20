import React from "react";
import Alert from '@mui/material/Alert';

const Message = ({message, type}) => {

    return (
        <Alert severity={type}>{message ? message : 'Success'}</Alert>
    )
}

export default Message;