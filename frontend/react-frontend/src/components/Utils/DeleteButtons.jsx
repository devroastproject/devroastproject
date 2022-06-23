import React from "react";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';

const DeleteButtons = ({deleting, setDeleting, deleteMethod}) => {

    return (
        <Dialog onClose={() => {setDeleting(false)}} open={deleting}>
            <Stack id="DeleteConfirm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <Button onClick={() => {setDeleting(false)}} startIcon={<CancelOutlined />}>Cancel Delete</Button> 
                <Button onClick={() => {deleteMethod()}} startIcon={<DeleteForeverOutlined />} color={'error'}>Delete Forever</Button>
            </Stack>
        </Dialog>
    )
};

export default DeleteButtons;
