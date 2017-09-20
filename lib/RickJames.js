require('dotenv').config();
let request = require('request');

let RickJames = {
  token: process.env.SLACK_OAUTH_ACCESS_TOKEN,
  endpoint: 'https://slack.com/api',
  channel: 'rickjames',
  channelId: 'C75DS6D2L',
  sendMessage: function(text = 'I\'m Rick James bitch') {
    let rick = this;
    request.post(`${rick.endpoint}/chat.postMessage`, {form:{token: rick.token, channel: rick.channel, text: text, as_user: false, username:'rickjames'}});
  },
  getChannelMessages: function(count = 100, inclusive = true) {
    let rick = this;
    let params = `token=${rick.token}&channel=${rick.channelId},count=${count}`;
    let url = `https://slack.com/api/channels.history?token=${rick.token}&channel=C75DS6D2L&count=100`;
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if(error) reject(error);
        let res = JSON.parse(body);
        let slides = res.messages.filter(el => el.type === 'message');
        let textSlides = slides.filter(el => !el.file);
        let imageSlides = slides.filter(el => el.file).map((item) => {
          let text = (item.file.initial_comment && item.file.initial_comment.comment) ? item.file.initial_comment.comment : '';
          let slide = {url: item.file.url_private, text: text, user: item.username};
          return slide;
        });
        let resp = {
          slides: {
            text: textSlides,
            images: imageSlides
          }
        };
        resolve(resp);
      });
    });
  }
};

module.exports = RickJames;