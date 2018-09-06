import React from 'react';

const Slide = (props) => {
  const {
    isActive,
    image,
    tabIndex
  } = props;

  return(
    <div className={`slide ${isActive ? 'active-slide' : ''}`}>
      <img tabIndex={tabIndex} aria-label={image.tags} src={image.webFormatUrl} alt={image.tags} className={'slide-img'} />
    </div>
  )
};

export default Slide;