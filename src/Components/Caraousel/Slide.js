import React from 'react';

const Slide = (props) => {
  const {
    isActive,
    image,
  } = props;

  return(
    <div className={`slide ${isActive ? 'active-slide' : ''}`}>
      <img src={image.webFormatUrl} alt={image.tags} className={'slide-img'} />
    </div>
  )
};

export default Slide;