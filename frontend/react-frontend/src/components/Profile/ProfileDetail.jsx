import React from "react";


const ProfileDetail = ({profile}) => {
    
    const{role, location, pronouns, about, website, twitter, github, linkedin} = profile

    return(
        <div id='ProfileDetail'>
            { profile === 404 ?
                <p>Profile Not Set Up Yet</p>
            :
                <>
                    <p>{role}</p>
                    <p>{location}</p>
                    <p>{pronouns}</p>
                    <p>{about}</p>
                    <p>{website}</p>
                    <p>{twitter}</p>
                    <p>{github}</p>
                    <p>{linkedin}</p>
                </>
            }
        </div>
    )
};

export default ProfileDetail
