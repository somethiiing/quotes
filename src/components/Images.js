import React, { Component } from 'react';
import Axios from 'axios';
import helper from '../lib/Slack';

export class Images extends Component {
  counter = 0;

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
    helper.getSlides()
    .then( data => {
      this.setState({ images: data.slides.images });
      this.changeImage();
    })
    .catch( err => {
      console.error(err);
    })
  }

  counterUpdater() {

  }

  changeImage() {
    this.counter = this.counter + 1;
    if (this.counter > this.state.images.length - 1) {
      this.counter = 0;
    }
    this.setState({ displayedImage: this.state.images[this.counter]});
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

