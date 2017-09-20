const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


// app setup
app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'dist')))
  .use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



  app.get('/api/', (req, res) => {
    res.send('Health Check: 200');
  })

  app.get('/api/quotes', (req, res) => {
    let quotesList = [
      { quote: 'The first step in fixing the world is accepting it.', author: 'Wilson' },
      { quote: 'Assume nothing.', author: 'Bogdan'},
      { quote: '. . .', author: 'Sarmad' },
      { quote: 'Try to learn something about everything and everything about something.', author: 'Thomas Henry Huxley' },
      { quote: 'PICKLE RICK!!!', author: 'Rick Sanchez' },
      { quote: 'Geez...', author: 'Morty' }
    ];

    res.send({status: 'SUCCESS', quotes: quotesList });
  });

  app.get('/api/images', (req, res) => {
    res.send({status: 'SUCCESS'})
  })






app.listen(6969, () => {
  console.log('listening on port 6969')
});

