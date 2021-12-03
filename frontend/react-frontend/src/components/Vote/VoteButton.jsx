import React from "react";

const VoteButton = ({users, plus, upVoted, downVoted, submit_vote}) => {

    return(
        <div className='voteButton'>
            <button 
                style={ (plus && upVoted) || (!plus && downVoted) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                disabled={ (plus  && downVoted) || (!plus && upVoted) }
                onClick={() => submit_vote(plus)}
            >
                {plus ? '+' : '-'}{users.length}
            </button>
        </div>
    )
};

export default VoteButton;
