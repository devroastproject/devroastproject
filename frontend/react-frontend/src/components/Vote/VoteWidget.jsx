import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { callApi } from "../../services/callAPI";
import VoteButton from "./VoteButton";
import Stack from '@mui/material/Stack';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const VoteWidget = ({comment_id, votes, closed}) => {

    const {user} = useContext(UserContext)
    const [pos_votes, setPosVotes] = useState([])
    const [neg_votes, setNegVotes] = useState([])
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const submit_vote = async (vote) => {
        
        // POST new vote
        let method = 'POST'
        let url = 'votes/'
        let data = {
            "user": user.info.id,
            "comment": comment_id,
            "positive": vote
        }
        // DELETE current vote
        if (userVote.id) {
            method = 'DELETE'
            data["id"] = userVote.id
            url = `votes/${userVote.id}/`
        }
       
        const res = await callApi(url, method, data, user.token)
        // update local state to update UI
        if (res.code === 201){   // POST result
            delete res.code
            setVote(res)
            if (res.positive) {
                setPosVotes([...pos_votes, user.info.username])
            } else {
                setNegVotes([...neg_votes, user.info.username])
            }
        } else if (res.code === 204) { // DELETE result
            setVote({})
            if (vote) {
                setPosVotes(pos_votes.filter(el => el !== user.info.username))
            } else {
                setNegVotes(neg_votes.filter(el => el !== user.info.username))
            }
        }
    }
    
    return(
        <Stack direction='row' className='voteWidget'>
            {user.info && !closed ? 
                <>
                    <VoteButton users={pos_votes} plus={true} userVote={userVote} submit_vote={submit_vote} />
                    <VoteButton users={neg_votes} plus={false} userVote={userVote} submit_vote={submit_vote} />
                </> 
            :   <>
                    <ThumbUpIcon fontSize="small" />{pos_votes.length} 
                    <ThumbDownIcon fontSize="small" />{neg_votes.length}
                </> }
        </Stack>
    )
};

export default VoteWidget;
