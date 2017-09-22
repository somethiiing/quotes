let rickJames = require('./RickJames');
let theDude = require('./TheDude');
let Slack = {
  getSlides: () => {
    return rickJames.getChannelMessages();
  },
  getUserList: () => {
    return rickJames.getUserList();
  },
  getDudeQuotes: () => {
    return theDude.getQuotes();
  },
  getCats: () => {
    return theDude.getCats();
  }
};

module.exports = Slack;