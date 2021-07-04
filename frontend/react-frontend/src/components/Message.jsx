import React from "react";

const Message = ({message, type}) => {

    return (
        <h3 className={type + " message"} >{message ? message : 'Success'}</h3>
    )
}

export default Message;