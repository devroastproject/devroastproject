import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';

const EditButtons = ({edit, setEdit, deleting, setDeleting}) => {

    return (
        <Stack className="EditButtons">
            <Button onClick={() => {setEdit(!edit)}}>  
                <CancelOutlined /> 
            </Button> 
            <Button disabled={deleting} onClick={() => {setDeleting(true)}}>
                <DeleteOutlineOutlined />
            </Button>
        </Stack> 
    )
};

export default EditButtons;
