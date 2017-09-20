let rickJames = require('./RickJames');

let Slack = {
  getSlides: function() {
    return rickJames.getChannelMessages();
  }
};

module.exports = Slack;