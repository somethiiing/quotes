let request = require('request');
let wordFilter = require('leo-profanity');
var parser = require('xml2json');

let TheDude = {
  catpoint: 'http://thecatapi.com/api/images/get',
  endpoint: 'http://lebowski.me/api/quotes/random',
  getCats: function() {
    let theDude = this;
    let params = '?format=xml&results_per_page=100';
    return new Promise((resolve, reject) => {
      request(`${theDude.catpoint}${params}`, (err, res, body) => {
        let resp = JSON.parse(parser.toJson(body));
        let images = resp.response.data.images.image.map((item) => {
          return {image: item.url};
        });
        resolve(images);
      });
    });
  },
  _getQuotes: function() {
    let theDude = this;
    return new Promise((resolve, reject) => {
      let quotes = [];
      request.get(theDude.endpoint, (error, res, body) => {
        if(error) reject(error);
        let resp = JSON.parse(body);
        quotes.push(resp.quote.lines.filter(el => el.text = wordFilter.clean(el.text)));
        resolve(quotes);
      });
    });
  },
  getQuotes: function() {
    let promises = [];
    let quotes = [];
    for(let i = 0; i < 100; i++) {
      promises.push(this._getQuotes());
    }
    return Promise.all(promises);
  }
};

// TheDude.getQuotes().then((res) => {
//   res.forEach((item) => {
//     console.log(item);
//   })
// });

module.exports = TheDude;