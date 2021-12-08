import React from "react";

const VoteButton = ({count, plus, userVote, submit_vote}) => {

    return(
        <div className='voteButton'>
            <button 
                style={ (plus && userVote === true) || (!plus && userVote === false) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                disabled={ (plus  && userVote === false) || (!plus && userVote === true) }
                onClick={() => submit_vote(plus)}
            >
                {plus ? '+' : '-'}{count}
            </button>
        </div>
    )
};

export default VoteButton;
