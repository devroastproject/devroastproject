import { callApiUpload } from "../../services/callApiUpload";
import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext"
import { useHistory } from "react-router";
import Message from "../Utils/Message";

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Backdrop from '@mui/material/Backdrop';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';

const ImageUpload = ({image, url, method, id}) => {

    const {user, setUser} = useContext(UserContext)
    let history = useHistory()
    const [open, setOpen] = useState(false)

    const handleUpload = async (e) => {
        let arg = image ? '' : e.target.files[0]
        const res = await callApiUpload(url, method, arg, user.token, id)
        if (res.code >= 200 && res.code < 300){   
            setUser({...user, message: <Message message={res.message} type="success"/>})   
            history.go(0)
        } else {
            setUser({...user, message: <Message message="Something Went Wrong" type="error"/>})   
        }
    }

    return(

        <Avatar 
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            src={image && !open ? `http://localhost:8000${image}` : ''}
            sx={{ width: 150, height: 150 }}
            variant='square'
        >
        <>
            {user.info.username[0]} 
            <Backdrop open={open} 
                sx={{ 
                    color: '#fff', 
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    position: 'absolute'
                }}
            >
            { image ? 
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleUpload}>
                    <DeleteForeverIcon/> 
                </IconButton>
            :
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" sx={{display: 'none'}} onChange={handleUpload} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddPhotoAlternateOutlinedIcon/>
                    </IconButton>
                </label>
            }
            </Backdrop>
        </>
        </Avatar>
    )
}

export default ImageUpload;
