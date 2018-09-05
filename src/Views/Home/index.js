import React, { Component } from 'react';
import Caraousel from '@carousel';
import { getAllImages } from '@ApiServices/ImageService'

export default class Home extends Component{

  state = {
    images:[]
  }

  componentDidMount(){
    getAllImages().then(({images})=>{
      this.setState({
        images
      })
    })
  }

  render(){
    const { images } = this.state;
    return (
      <div>
        <Caraousel
          images={images.splice(0,5)}
        />
      </div>
    )
  }
}



