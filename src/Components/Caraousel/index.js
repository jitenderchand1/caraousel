import React, { Component } from 'react';
import Slide from './Slide';

export default class Caraousel extends Component{

  render(){
    const { images } = this.props;
    const imagesToRender = [...images];
    return (
      <div className="slider">
        {
          imagesToRender.map(image => {
            return (
              <Slide key={image.id} image={image} isActive="" />
            )
          })
        }
      </div>
    )
  }
}

