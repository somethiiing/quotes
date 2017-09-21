let rickJames = require('./RickJames');

let Slack = {
  getSlides: () => {
    return rickJames.getChannelMessages();
  },
  getUserList: () => {
    return rickJames.getUserList();
  }
};

module.exports = Slack;