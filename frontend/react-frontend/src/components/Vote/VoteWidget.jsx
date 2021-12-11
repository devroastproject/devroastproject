import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import VoteButton from "./VoteButton";


const VoteWidget = ({comment_id, votes, closed}) => {

    const {user} = useContext(UserContext)
    const [pos_votes, setPosVotes] = useState(0)
    const [neg_votes, setNegVotes] = useState(0)
    const [userVote, setVote] = useState({})

    useEffect(() => {
        let plus_one = [], minus_one = []
        for (let i = 0; i < votes.length; i++) {
            let vote = votes[i]
            if (user.info) { // when user is loaded, iterate over votes
                // extract users vote, if it exists
                if (vote['user'] === user.info.id) {
                    setVote(vote) 
                }
            }   
            // store the usernames that voted
            vote['positive'] === true ? plus_one.push(vote['username']) : minus_one.push(vote['username'])
        }
        setPosVotes(plus_one)
        setNegVotes(minus_one)
    }, [user, votes])

    const submit_vote = async (vote) => {

        let method = 'POST'
        let url = 'votes/'
        let data = {
            "user": user.info.id,
            "comment": comment_id,
            "positive": vote
        }

        if (userVote.id) {
            method = 'DELETE'
            data["id"] = userVote.id
            url = `votes/${userVote.id}/`
        }
      
        console.log(url, method, data, user.token)
        const res = await callApi(url, method, data, user.token)
        
        if (res.code >= 200 || res.code < 300){   
            if (userVote.id) {
                // votes - userVote
            } else {
                // votes.push(userVote)
            }
        }
    }
    
    return(
        <div className='voteWidget'>
            {user.info && !closed ? 
                <>
                    <VoteButton users={pos_votes} plus={true} userVote={userVote} submit_vote={submit_vote} />
                    <VoteButton users={neg_votes} plus={false} userVote={userVote} submit_vote={submit_vote} />
                </> 
            : <p>+{pos_votes.length} -{neg_votes.length}</p> }
        </div>
    )
};

export default VoteWidget;
