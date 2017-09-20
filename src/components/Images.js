import React, { Component } from 'react';
import Axios from 'axios';
import helper from '../lib/Slack';

export class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
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

    helper.getSlides()
    .then( data => {
      console.log(data.slides.images);
      this.setState({ images: data.slides.images });
      this.changeImage();
    })
    .catch( err => {
      console.error(err);
    })
  }

  changeImage() {
    let random = this.state.images[Math.floor(Math.random()*this.state.images.length)];
    this.setState({displayedImage: random });

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

