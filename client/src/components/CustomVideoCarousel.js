import React, { useRef } from 'react'
import CustomModal from './CustomModal'
import Carousel from 'react-multi-carousel'

function CustomVideoCarousel({ isModalOpen, handleModal, videos }) {
    const videoPlayerRef = useRef()
    return (
        <CustomModal isModalOpen={isModalOpen} handleModal={handleModal} customStyle={{ width: '60%', bgcolor: 'transparent', boxShadow: 0 }}>
            <Carousel
                additionalTransfrom={0}
                arrows
                centerMode={false}
                containerClass="container-with-dots"
                minimumTouchDrag={80}
                showDots={false}
                slidesToSlide={1}
                responsive={{
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 20
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 1,
                        partialVisibilityGutter: 20
                    },
                    laptop: {
                        breakpoint: {
                            max: 1724,
                            min: 1024
                        },
                        items: 1,
                        partialVisibilityGutter: 20
                    },
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1724
                        },
                        items: 1,
                        partialVisibilityGutter: 20
                    },

                }}
            >
                {videos.map(singleVideo => {
                    return <video
                        ref={videoPlayerRef}
                        preload='true'
                        key={singleVideo.video}
                        src={singleVideo.video}
                        width='100%'
                        style={{ borderRadius: '10px' }}
                        controls
                    />
                })}
            </Carousel>

        </CustomModal>
    )
}

export default CustomVideoCarousel