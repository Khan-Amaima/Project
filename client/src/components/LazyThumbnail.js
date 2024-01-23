import React from 'react';

const LazyThumbnail = ({ item,refer,height,width }) => {
  return (
  <img
  ref={refer}
    src={`${process.env.REACT_APP_BASE_URL}${item}`}
    width={width}
    height={height}
    style={{
      borderRadius: "6px",
      objectFit:'contain'
    }}
  /> );
};

export default LazyThumbnail;