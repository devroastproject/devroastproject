import React from "react";

import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';

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
