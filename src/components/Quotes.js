import React, { Component } from 'react';
import Axios from 'axios';

import helper from '../lib/Slack';

import './Quotes.css';


export class Quotes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      users: {},
      counter: 0,
      displayedQuote: {quote: 'loading...', author: 'unknown'}
    };

    this.changeQuote = this.changeQuote.bind(this);
  }

  componentDidMount() {
    // Axios.get('http://localhost:6969/api/quotes')
    // .then( res => {
    //   this.setState({ quotes: res.data.quotes });
    //   this.changeQuote();
    // })
    // .catch( err => {
    //   console.error(err);
    // });


    helper.getSlides()
    .then( data => {
      this.setState({ quotes: data.slides.text });
      this.changeQuote();
    })
    .catch( err => {
      console.error(err);
    });

    helper.getUserList()
    .then( data => {
      this.setState({users: data.users});
    })
    .catch(err => console.error(err));


  }

  changeQuote() {
    // let random = this.state.quotes[Math.floor(Math.random()*this.state.quotes.length)];
    // this.setState({displayedQuote: random });
    let counter = this.state.counter++;
    this.setState({ displayedQuote: this.state.quotes[counter]});


    setTimeout(this.changeQuote, 5000);
  }

  render () {
    return (
      <div className="container">
        <h1 className="quote anim-text-flow">"{this.state.displayedQuote.quote}"</h1>
        <h1 className="author">- {this.state.users[this.state.displayedQuote.author]}</h1>
      </div>
    );
  }
}

