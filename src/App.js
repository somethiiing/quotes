import React, { Component } from 'react';
import { Quotes, Images, QuotesImages } from './components/index';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

class App extends Component {

  state = {
    quotes: []
  };

  componentDidMount() {

  }



  render() {
    return (
      <Router>
        <div className="main">

          <Route exact path="/" component={Quotes}/>
          <Route path="/quotes" component={Quotes}/>
          <Route path="/images" component={Images}/>
          <Route path="/quotesimages" component={QuotesImages}/>
        </div>
      </Router>
    );
  }
}

export default App;
