import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";

const VoteWidget = ({id, votes}) => {
    
    const {user, setUser} = useContext(UserContext)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        user.info ? setUsername(user.info.username) : setUsername(null) 
    },[user])

    const submit_vote = async (vote) => {
    
        let data = {
            "user": username,
            "comment": id,
            "positive": vote > 0 ? true : false
        }
        
        const res = await callApi(url, method, data, user.token)
    }

    return(
        <div className='voteWidget'>
            <button 
                style={votes['+1'].includes(username) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                onClick = {submit_vote(1)}
            >
                +{votes['+1'].length}
            </button>
            <button 
                style={votes['-1'].includes(username) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                onClick = {submit_vote(-1)}
            >
                -{votes['-1'].length}
            </button>
        </div>
    )
};

export default VoteWidget;
