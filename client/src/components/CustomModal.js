import React, { Children } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

function CustomModal({ children, isModalOpen, handleModal }) {

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default CustomModal