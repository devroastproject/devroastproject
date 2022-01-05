import VoteWidget from "../Vote/VoteWidget";
import React from "react";
import TagList from "../Tags/TagList";

const Comment = ({comment}) => {
    const {id, body, votes, username, closed, tags} = comment

    return(
        <div className='preview'>
            <div>
                {closed ? <p>{'CLOSED'}</p> : null}
                <p>{body}</p>
                <p>by {username}</p>
                <VoteWidget comment_id={id} votes={votes} closed={closed} />
                <TagList tags={tags}/>
            </div>   
        </div>
    )
};

export default Comment;
