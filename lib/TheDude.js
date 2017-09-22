let request = require('request');
let wordFilter = require('leo-profanity');
var parser = require('xml2json');

let TheDude = {
  catpoint: 'http://thecatapi.com/api/images/get',
  endpoint: 'http://lebowski.me/api/quotes/random',
  getCats: function() {
    let theDude = this;
    let params = '?format=xml&results_per_page=20';
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
  getQuotes: function() {
    let theDude = this;
    return new Promise((resolve, reject) => {
      request.get(theDude.endpoint, (error, res, body) => {
        if(error) reject(error);
        
        let resp = JSON.parse(body);
        let quotes = resp.quote.lines.filter(el => el.text = wordFilter.clean(el.text));
        resolve(quotes);
      });
    });
  }
};
/*
TheDude.getQuotes().then((res) => {
  console.log(res);
});
*/
// TheDude.getCats().then((res) => {
//   console.log(res);
// });
module.exports = TheDude;