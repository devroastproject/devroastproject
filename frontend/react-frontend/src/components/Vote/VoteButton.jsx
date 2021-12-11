import React from "react";

const VoteButton = ({users, plus, userVote, submit_vote}) => {

    return(
        <div className='voteButton'>
            <button 
            // if the user has voted on a comment, their vote is relflected by BOLDING the button the clicked and disabling the other
                style={ (plus && userVote.positive === true) || (!plus && userVote.positive === false) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                disabled={ (plus  && userVote.positive === false) || (!plus && userVote.positive === true) }
                onClick={() => submit_vote(plus)}
            >
                {plus ? '+' : '-'}{users.length}
            </button>
        </div>
    )
};

export default VoteButton;
