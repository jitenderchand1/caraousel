import React, { Component, Fragment } from 'react';
import Caraousel from '@carousel';
import { getAllImages } from '@ApiServices'
import './style.scss';

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
      <Fragment>
        <div className="container">
          <div>
            <h1 tabIndex={0} aria-label="title">Carousel Test</h1>
          </div>
        </div>
        <div className="home-slider-wpr" tabIndex={1}>
          <div className="container">
            <Caraousel
              slideWidth={200}
              images={images.splice(0,6)}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}



