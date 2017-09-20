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
    // let params = `token=${rick.token}&channel=${rick.channelId},count=${count}`;
    let url = `https://slack.com/api/channels.history?token=xoxp-97686637318-124897355792-244268503957-2f654a101e2ce827a5a5a3f4df4b8afc&channel=C75DS6D2L&count=100`;
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if(error) reject(error);
        let res = JSON.parse(body);
        let slides = res.messages.filter(el => el.type === 'message' && el.subtype !== 'channel_purpose' && el.subtype !== 'channel_join' && el.subtype !== 'bot_message');
        let textSlides = slides.filter(el => !el.file).map((item) => {
          return { author: item.user, quote: item.text }
        });
        let imageSlides = slides.filter(el => el.file).map((item) => {
          let text = (item.file.initial_comment && item.file.initial_comment.comment) ? item.file.initial_comment.comment : '';
          return {image: item.file.url_private, alt: text, author: item.username};
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