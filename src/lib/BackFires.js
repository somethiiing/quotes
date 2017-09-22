let mongo = require('mongo').MongoClient,
connectionString = 'mongodb://rickjames:rickjames123@ds141534.mlab.com:41534/rickjamessecretstash';

let Data = {
  dbInstance: null,
  getImages: function () {
    if (!this.dbInstance) {
      mongo.connect(connectionString).then((db) => {
        return db.collection('randomcarimages').find({}, {'url': 1});
      });
    }
  },
  getComments: function () {
    if (!this.dbInstance) {
      mongo.connect(connectionString).then((db) => {
        return db.collection('randombackfirescomments').find({});
      });
    }
  }
};
console.log(Data.getImages());
module.exports = Data;