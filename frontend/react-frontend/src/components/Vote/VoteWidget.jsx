import React, { useState, useContext, useEffect } from "react";
import VoteButton from "./VoteButton";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";

const VoteWidget = ({id, votes}) => {
    
    const {user} = useContext(UserContext)
    const [username, setUsername] = useState(null)
    const [upVoted, setUpVoted] = useState(null)
    const [downVoted, setDownVoted] = useState(null)

    let pos_votes = votes['+1']
    let neg_votes = votes['-1']

    useEffect(() => {
        user.info ? setUsername(user.info.username) : setUsername(null);
        pos_votes.includes(username) ? setUpVoted(true) : setUpVoted(false);
        neg_votes.includes(username) ? setDownVoted(true) : setDownVoted(false);
    },[user, username])

    const submit_vote = async (vote) => {

        let data = {
            "user": user.info.id,
            "comment": id,
            "positive": vote
        }
        
        let method = (upVoted || downVoted) ? 'DELETE' : 'POST'
        
        const res = await callApi('votes/', method, data, user.token)
    }
    

    return(
        <div className='voteWidget'>
           <VoteButton users={pos_votes} plus={true} upVoted={upVoted} downVoted={downVoted} submit_vote={submit_vote} />
           <VoteButton users={neg_votes} plus={false} upVoted={upVoted} downVoted={downVoted} submit_vote={submit_vote} />
        </div>
    )
};

export default VoteWidget;
