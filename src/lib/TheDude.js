let request = require('request');
let wordFilter = require('leo-profanity');
var parser = require('xml2json');

let TheDude = {
  catpoint: 'http://thecatapi.com/api/images/get',
  endpoint: 'http://lebowski.me/api/quotes/random',
  getCats: function() {
    let theDude = this;
    let params = '?format=xml&results_per_page=20';
    request(`${theDude.catpoint}${params}`, (err, res, body) => {
      let resp = JSON.parse(parser.toJson(body));
      let images = resp.response.data.images.image.map((item) => {
        return {image: item.url};
      });
      return images;
    });
  },
  getQuotes: function() {
    let theDude = this;
    let quotes = [];
    return new Promise((resolve, reject) => {
      for(let i = 0; i < 19; i++) {
        request.get(theDude.endpoint, (error, res, body) => {
          if(error) reject(error);
          let resp = JSON.parse(body);
          quotes.push(resp.quote.lines.filter(el => el.text = wordFilter.clean(el.text)));
        });
        if(i === 19) {
          resolve(quotes);
        }
      }
    });
  }
};
/*
TheDude.getQuotes().then((res) => {
  console.log(res);
});
*/
module.exports = TheDude;