import React, { Component, Fragment } from 'react';
import Slide from './Slide';
import PropTypes from 'prop-types';
import './style.scss'

/**
 * @name Carousel
 * @class
 * @description
 * Caraousel component that takes 6 images as an array and shows them
 * as a slider
 */
export default class Carousel extends Component{

   constructor(props){
     super(props);
     this.state = {
       imagesToRender:props.images,
       endIndex: 5,
       activeSlide: 2,
       scrollPosition: -props.slideWidth,
       isTransitionClassAdded: false,
       pauseAction: false
     }
     this.scrollForSlide = props.slideWidth;
   }

  noOfInactiveSlides = 3;


  componentDidMount(){
     const {images} = this.props;
     const { activeSlide } = this.state;
     let newSlides = this.appendPreviousItem(activeSlide);
     this.setState({
       imagesToRender: [newSlides, ...this.state.imagesToRender]
     })
  }

  /**
   * @name appendPreviousItem
   * @function
   * @description
   * returns previous item to the current images on the dom
   * in case user presses prev button
   *
   * @param index
   * @returns {object} image - image to prepend
   * @returns {string} image.id - id for each image
   * @returns {string} image.webFormatUrl - image url with smaller size
   * @returns {string} image.largeImageUrl - image url with large size
   * @returns {string} image.tags - image tags
   */
  appendPreviousItem = (index)=>{
    const {images} = this.props;
    let indexToReturn = (index - this.noOfInactiveSlides) % images.length;
    if (indexToReturn < 0) {
      indexToReturn = images.length + indexToReturn;
    }

    return images[indexToReturn]
  };


  /**
   * @name appendNextItem
   * @function
   * @description
   * returns next item to the current images on the dom
   * in case user presses next button
   *
   * @param index
   * @returns {object} image - image to prepend
   * @returns {string} image.id - id for each image
   * @returns {string} image.webFormatUrl - image url with smaller size
   * @returns {string} image.largeImageUrl - image url with large size
   * @returns {string} image.tags - image tags
   */

  appendNextItem = (index)=> {
    const {images} = this.props;
    let indexToReturn = (index + this.noOfInactiveSlides) % images.length;

    if (indexToReturn < 0) {
      indexToReturn = images.length + indexToReturn;
    }

    return images[indexToReturn];
  };

  addTransitionClass = () => {
    this.setState({ isTransitionClassAdded: true });
  };

  removeTransitionClass = () => {
    this.setState({ isTransitionClassAdded: false });
  };


  /**
   * @name moveToNextSlide
   * @function
   * @description
   * translate slide in negative value and reset it to default after transition complete
   * in case user presses next button
   */
  moveToNextSlide = ()=> {
    const { scrollPosition, activeSlide, imagesToRender, pauseAction } = this.state;
    if(pauseAction) return
    const newImageToRender = this.appendNextItem(activeSlide + 1);
    let newImagesToRender = [...imagesToRender].slice(1);
    this.addTransitionClass();
    this.setState({
      scrollPosition: scrollPosition - this.scrollForSlide,
      activeSlide: activeSlide + 1,
      pauseAction: true
    }, () => {
      setTimeout(() => {
        this.removeTransitionClass();
        this.setState({
          scrollPosition: this.state.scrollPosition + this.scrollForSlide,
          imagesToRender:[...newImagesToRender,newImageToRender],
          pauseAction: false
        })
      }, 300)
    })
  };


  /**
   * @name moveToPrevSlide
   * @function
   * @description
   * translate slide in positive value and reset it to default after transition complete
   * in case user presses prev button
   */
  moveToPrevSlide = ()=> {
    const { scrollPosition, activeSlide, imagesToRender, pauseAction } = this.state;
    if(pauseAction) return
    const newImageToRender = this.appendPreviousItem(activeSlide - 1)
    let newImagesToRender = [...imagesToRender];
    newImagesToRender.splice(-1,1);
    this.addTransitionClass();
    this.setState({
      scrollPosition: scrollPosition + this.scrollForSlide,
      activeSlide: activeSlide - 1,
      pauseAction: true
    }, () => {
      setTimeout(() => {
        this.removeTransitionClass();
        this.setState({
          scrollPosition: this.state.scrollPosition - this.scrollForSlide,
          imagesToRender:[newImageToRender, ...newImagesToRender],
          pauseAction: false
        })
      }, 300)
    })
  }

  render(){
    const { imagesToRender, scrollPosition, isTransitionClassAdded } = this.state;
    return (
      <Fragment>
        <div className="slider">
          <div
            className={`slide-container ${isTransitionClassAdded ? 'trans' : ''}`}
            style={{width: `${imagesToRender.length * this.props.slideWidth}px`, transform:`translate(${scrollPosition}px)`}}
          >
          {
            imagesToRender.map((image, index) => {
              return (
                <Slide tabIndex={(index)} key={index} image={image} isActive="" />
              )
            })
          }
          </div>
        </div>
        <div className="carousel-button-row">
          <button role="button" aria-label="Move to previous slide" className="carousel-button prev" onClick={this.moveToPrevSlide}>Prev</button>
          <button role="button" aria-label="Move to next slide" className="carousel-button next" onClick={this.moveToNextSlide}>Next</button>
        </div>
      </Fragment>
    )
  }
}

Carousel.propTypes = {
  images: PropTypes.array,
};

Carousel.defaultProps = {
  images: [],
};


