import React, { Component } from 'react';
import Slide from './Slide';
import './style.scss'

export default class Caraousel extends Component{

   constructor(props){
     super(props);
     this.state = {
       imagesToRender:props.images,
       endIndex: 5,
       activeSlide: 2,
       scrollPosition: -200,
       isTransitionClassAdded: false,
     }
   }

  noOfInactiveSlides = 3;
  scrollForSlide = 200;

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

  moveNext = ()=> {
    const { scrollPosition, activeSlide, imagesToRender } = this.state;
    const newImageToRender = this.appendNextItem(activeSlide + 1);
    let newImagesToRender = [...imagesToRender].slice(1);
    this.addTransitionClass();
    this.setState({
      scrollPosition: scrollPosition - this.scrollForSlide,
      activeSlide: activeSlide + 1,
    }, () => {
      setTimeout(() => {
        this.removeTransitionClass();
        this.setState({
          scrollPosition: this.state.scrollPosition + this.scrollForSlide,
          imagesToRender:[...newImagesToRender,newImageToRender],
        })
      }, 300)
    })
  };

  movePrev = ()=> {
    const { scrollPosition, activeSlide, imagesToRender } = this.state;
    const newImageToRender = this.appendPreviousItem(activeSlide - 1)
    let newImagesToRender = [...imagesToRender];
    newImagesToRender.splice(-1,1);
    this.addTransitionClass();
    this.setState({
      scrollPosition: scrollPosition + this.scrollForSlide,
      activeSlide: activeSlide - 1,
    }, () => {
      setTimeout(() => {
        this.removeTransitionClass();
        this.setState({
          scrollPosition: this.state.scrollPosition - this.scrollForSlide,
          imagesToRender:[newImageToRender, ...newImagesToRender],
        })
      }, 300)
    })
  }

  render(){
    const { imagesToRender, scrollPosition, isTransitionClassAdded } = this.state;
    return (
      <div className="slider">
        <div
          className={`slide-container ${isTransitionClassAdded ? 'trans' : ''}`}
          style={{width: `${imagesToRender.length * 200}px`, transform:`translate(${scrollPosition}px)`}}
        >
        {
          imagesToRender.map((image, index) => {
            return (
              <Slide key={index} image={image} isActive="" />
            )
          })
        }
        </div>
        <button onClick={this.movePrev}>Prev</button>
        <button onClick={this.moveNext}>Next</button>
      </div>
    )
  }
}

