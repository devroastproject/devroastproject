import React from "react";
import VoteWidget from "./VoteWidget";
// import Tag from "./Tag";

const Comment = ({comment}) => {
    const {id, body, votes, username, closed} = comment

    return(
        <div className='preview'>
            <div>
                {closed ? <p>{'CLOSED'}</p> : null}
                <p>{body}</p>
                <p>by {username}</p>
                <VoteWidget id={id} votes={votes} />
                {/* <div>
                    {tags.map((tag) => <Tag key={tag.id} tag={tag}/> )}
                </div> */}
            </div>   
        </div>
    )
};

export default Comment;
