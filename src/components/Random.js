//cat api + lebowski quotes

import React, { Component } from 'react';
import Axios from 'axios';
import helper from '../lib/Slack';
import cat from '../Data/catAPI';

export class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      counter: 0,
      displayedImage: {image: 'http://www.jqueryscript.net/images/Custom-Loading-Indicator-Plugin-with-jQuery-Font-Awesome-faloading.jpg', alt: 'loading...', author: 'test dude' }
    };

    this.changeImage = this.changeImage.bind(this);
  }

  componentDidMount () {
    // Axios.get('http://localhost:6969/api/images')
    // .then( res => {
    //   console.log(res.data);
    //   this.setState({ images: res.data.images });
    //   this.changeImage();
    // })
    // .catch( err => {
    //   console.error(err);
    // })

    // helper.getSlides()
    // .then( data => {
    //   console.log(data.slides.images);
    //   this.setState({ images: data.slides.images });
    //   this.changeImage();
    // })
    // .catch( err => {
    //   console.error(err);
    // })

    this.setState({ images: cat.images});

    // leave settimeout. setState is asynchronous. page will crash
    setTimeout(this.changeImage, 0);

  }

  changeImage() {
    // let random = this.state.images[Math.floor(Math.random()*this.state.images.length)];
    // this.setState({displayedImage: random });
    console.log(this.state);

    let counter = this.state.counter++;
    this.setState({ displayedImage: this.state.images[counter]});

    setTimeout(this.changeImage, 5000);
  }

  render () {
    return (
      <div className="container">
        <img className="imageOnly" src={this.state.displayedImage.image} alt="{this.state.displayedImage.alt}" />
        <div className="imageText">
          <h2>{`${this.state.displayedImage.alt}` || ''} - {this.state.displayedImage.author}</h2>
        </div>
      </div>
    );
  }
}

