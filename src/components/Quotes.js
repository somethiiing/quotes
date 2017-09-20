import React, { Component } from 'react';
import Axios from 'axios';

import './Quotes.css';


export class Quotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      displayedQuote: {quote: 'loading...', author: 'unknown'}
    };

    this.changeQuote = this.changeQuote.bind(this);
  }

  componentDidMount() {
    Axios.get('http://localhost:6969/api/quotes')
    .then( res => {
      this.setState({ quotes: res.data.quotes });
      setTimeout(this.changeQuote, 0);
    })
    .catch( err => {
      console.error(err);
    })
  }

  changeQuote() {
    let random = this.state.quotes[Math.floor(Math.random()*this.state.quotes.length)];
    this.setState({displayedQuote: random });

    setTimeout(this.changeQuote, 5000);
  }

  render () {
    return (
      <div className="container">
        <p className="txt anim-text-flow">"{this.state.displayedQuote.quote}" -{this.state.displayedQuote.author}</p>
      </div>
    );
  }
}

