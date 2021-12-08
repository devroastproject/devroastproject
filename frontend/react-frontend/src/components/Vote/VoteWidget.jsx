import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import VoteButton from "./VoteButton";


const VoteWidget = ({id, votes}) => {

    const {user} = useContext(UserContext)
    let [pos_votes, setPosVotes] = useState(0)
    let [neg_votes, setNegVotes] = useState(0)
    const [userVote, setVote] = useState({})

    useEffect(() => {
        if (user.info) {
            let plus_one = 0, minus_one = 0
            for (let i = 0; i < votes.length; i++) {
                let vote = votes[i]
                if (vote['user'] === user.info.id) {
                    vote['positive'] === true ? setVote(true) : setVote(false) 
                }
                vote['positive'] === true ? plus_one += 1 : minus_one += 1
            }
            setPosVotes(plus_one)
            setNegVotes(minus_one)
        }   
    }, [user, votes])

    const submit_vote = async (vote) => {
        let data = {
            "user": user.info.id,
            "comment": id,
            "positive": vote
        }
        let method = userVote ? 'DELETE' : 'POST'
        const res = await callApi('votes/', method, data, user.token)
    }
    
    return(
        <div className='voteWidget'>
            {user.info ? 
                <>
                    <VoteButton count={pos_votes} plus={true} userVote={userVote} submit_vote={submit_vote} />
                    <VoteButton count={neg_votes} plus={false} userVote={userVote} submit_vote={submit_vote} />
                </> 
            : null }
        </div>
    )
};

export default VoteWidget;
