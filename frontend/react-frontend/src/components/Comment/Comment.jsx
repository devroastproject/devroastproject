import React from "react";

const Comment = ({comment}) => {
    const {body, username, closed} = comment

    return(
        <div className='preview'>
            <div>
                {closed ? <p>{'CLOSED'}</p> : null}
                <p>{body}</p>
                <p>by {username}</p>
            </div>   
        </div>
    )
};

export default Comment;
