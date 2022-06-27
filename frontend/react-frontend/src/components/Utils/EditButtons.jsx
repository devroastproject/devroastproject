import React from "react";

import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';

const EditButtons = ({edit, setEdit, deleting, setDeleting}) => {

    return (
        <Stack className="EditButtons">
            <Button onClick={() => {setEdit(!edit)}}>  
                <CancelOutlined /> 
            </Button> 
            <Button disabled={deleting} onClick={() => {setDeleting(true)}} id="DeleteButton">
                <DeleteOutlineOutlined />
            </Button>
        </Stack> 
    )
};

export default EditButtons;
