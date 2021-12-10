import VoteWidget from "../Vote/VoteWidget";
import React from "react";
// import Tag from "./Tag";

const Comment = ({comment}) => {
    const {id, body, votes, username, closed} = comment

    return(
        <div className='preview'>
            <div>
                {closed ? <p>{'CLOSED'}</p> : null}
                <p>{body}</p>
                <p>by {username}</p>
                <VoteWidget id={id} votes={votes} closed={closed} />
                {/* <div>
                    {tags.map((tag) => <Tag key={tag.id} tag={tag}/> )}
                </div> */}
            </div>   
        </div>
    )
};

export default Comment;
