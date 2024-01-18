import React from 'react';

const LazyThumbnail = ({ item,refer }) => {
  return (<img
  ref={refer}
    src={`${process.env.REACT_APP_BASE_URL}${item?.thumbnail}`}
    width={160}
    height={90}
    style={{
      borderRadius: "6px",
      objectFit: "contain"
    }}
  /> );
};

export default LazyThumbnail;