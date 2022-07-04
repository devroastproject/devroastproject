import React from "react";


const ProfileDetail = ({profile}) => {
    
    const{role, location, pronouns, about, website, twitter, github, linkedin} = profile

    return(
        <div id='ProfileDetail'>
            <p>{role}</p>
            <p>{location}</p>
            <p>{pronouns}</p>
            <p>{about}</p>
            <p>{website}</p>
            <p>{twitter}</p>
            <p>{github}</p>
            <p>{linkedin}</p>
        </div>
    )
};

export default ProfileDetail
