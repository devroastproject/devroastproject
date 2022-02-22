import VoteWidget from "../Vote/VoteWidget";
import React from "react";
import TagWidget from "../Tags/TagWidget";

const Comment = ({comment}) => {
    const {id, body, votes, username, closed, tags} = comment

    return(
        <div className='preview'>
            <div>
                {closed ? <p>{'CLOSED'}</p> : null}
                <p>{body}</p>
                <p>by {username}</p>
                <VoteWidget comment_id={id} votes={votes} closed={closed} />
                <TagWidget tags={tags} comment_id={comment.id} username={username} closed={closed}/>
            </div>   
        </div>
    )
};

export default Comment;
