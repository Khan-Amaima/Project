import React from 'react'
import CustomModal from './CustomModal'

function CustomVideoPlayer({ isModalOpen, handleModal, url }) {
    return (
        <CustomModal isModalOpen={isModalOpen} handleModal={handleModal} customStyle={{ width: 'auto', bgcolor: 'transparent', boxShadow: 0 }}>
            <video
                controls
                src={url}
                height='100%'
                width='100%'
                style={{ borderRadius: '10px' }}
            />
        </CustomModal>
    )
}

export default CustomVideoPlayer