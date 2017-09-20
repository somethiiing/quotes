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
    let imagesList = [
      { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F7669TLF4-0d8aab112c/20170920_134354_1024.jpg', alt: 'food', author: 'napoli'  },
      { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F763J981Y-b4b90392d2/img_20170903_133551_611_1024.jpg', alt: 'car', author: 'another important person' },
      { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F763HSZK4-f1d233e788/20170821_140717_1024.jpg', alt: 'eclipse party', author: 'someone important' },
      { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F75HQCX7T-1345aaac1b/20170901_233856_1024.jpg', alt: 'Try to learn something about everything and everything about something.', author: 'pboggs' }
    ];

    res.send({ status: 'SUCCESS', images: imagesList });
  });

  // app.get('/api/quotesimages', (req, res) => {
  //   let quotesimagesList = [
  //     { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F7669TLF4-0d8aab112c/20170920_134354_1024.jpg' },
  //     { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F77304V54-3e01e51c71/20170920_134403_1024.jpg' },
  //     { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F763J981Y-b4b90392d2/img_20170903_133551_611_1024.jpg' },
  //     { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F763HSZK4-f1d233e788/20170821_140717_1024.jpg' },
  //     { image: 'https://files.slack.com/files-tmb/T2VL6JR9C-F75HQCX7T-1345aaac1b/20170901_233856_1024.jpg' }
  //   ]
  //   res.send({ status: 'SUCCESS', quotesimagesList: quotesimagesList })
  // });






app.listen(6969, () => {
  console.log('listening on port 6969')
});

