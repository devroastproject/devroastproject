import React from "react";
// import Tag from "./Tag";

const Comment = ({comment}) => {
    const {body, neg_votes, pos_votes, username} = comment

    return(
        <div className='preview'>
            <div>
                <p>{body}</p>
                <p>by {username}</p>
                <p>+{pos_votes}, -{neg_votes}</p>
                {/* <div>
                    {tags.map((tag) => <Tag key={tag.id} tag={tag}/> )}
                </div> */}
            </div>   
        </div>
    )
};

export default Comment;
