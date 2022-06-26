import React from "react";

import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';

const VoteButton = ({users, plus, userVote, submit_vote, disabled}) => {

    return(
        <Button className='voteButton'
        // if the user has voted on a comment, their vote is relflected by BOLDING the button the clicked and disabling the other
            variant={ (plus && userVote.positive === true) || (!plus && userVote.positive === false) ? 'contained' : 'text'}
            disabled={ (plus  && userVote.positive === false) || (!plus && userVote.positive === true) || disabled}
            onClick={() => submit_vote(plus)}
            startIcon={plus ? <ThumbUpIcon /> : <ThumbDownIcon />}
        >
            {users.length}
        </Button>
    )
};

export default VoteButton;
