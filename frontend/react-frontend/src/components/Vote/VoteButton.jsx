import React from "react";

const VoteButton = ({users, plus, userVote, submit_vote}) => {

    return(
        <div className='voteButton'>
            <button 
            // if the user has voted on a comment, their vote is relflected by BOLDING the button the clicked and disabling the other
                style={ (plus && userVote === true) || (!plus && userVote === false) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                disabled={ (plus  && userVote === false) || (!plus && userVote === true) }
                onClick={() => submit_vote(plus)}
            >
                {plus ? '+' : '-'}{users.length}
            </button>
        </div>
    )
};

export default VoteButton;
