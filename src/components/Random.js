//cat api + lebowski quotes

import React, { Component } from 'react';
import Axios from 'axios';
import helper from '../lib/Slack';
import cat from '../Data/catAPI';

export class Random extends Component {
  api = 'http://localhost:6969';

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      quotes: [],
      counter: 0,
      displayedImage: {image: 'http://www.jqueryscript.net/images/Custom-Loading-Indicator-Plugin-with-jQuery-Font-Awesome-faloading.jpg', alt: 'loading...', author: 'test dude' },
      displayedQuote: 'loading...'
    };

    this.changeImageQuote = this.changeImageQuote.bind(this);
  }

  componentDidMount () {
    Axios.get(`${this.api}/api/cats`)
    .then( res => {
      this.setState({ images: res.data });
    })
    .catch( err => {
      console.error(err);
    });

    Axios.get(`${this.api}/api/dude`)
    .then( res => {
      this.setState({quotes: res.data })

      setTimeout(this.changeImageQuote, 0);
    })
    .catch(err => console.error(err));

  }

  changeImageQuote() {
    let random = Math.floor(Math.random()*this.state.quotes.length);
    this.setState({
      displayedImage: this.state.images[random],
      displayedQuote: this.state.quotes[random]
    });

    setTimeout(this.changeImageQuote, 5000);
  }

  render () {
    return (
      <div className="container">
        <img className="imageOnly" src={this.state.displayedImage.image} alt="Cat failed to load :/" />
        <div className="imageText">
          <h2>{`${this.state.displayedQuote}` || ''}</h2>
        </div>
      </div>
    );
  }
}

