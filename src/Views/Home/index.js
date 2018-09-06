import React, { Component } from 'react';
import Caraousel from '@carousel';
import { getAllImages } from '@ApiServices/ImageService'

export default class Home extends Component{

  state = {
    images:[],
    loader: false
  }

  componentWillMount(){
    this.setState({
      loader: true
    })
    getAllImages().then(({images})=>{
      this.setState({
        images,
        loader: false
      })
    })
  }


  render(){
    const { images, loader } = this.state;
    if(loader){
      return <div>Loader</div>
    }
    return (
      <div>
        <Caraousel
          images={images.splice(0,6)}
        />
      </div>
    )
  }
}



