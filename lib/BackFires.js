let MongoClient = require('mongodb').MongoClient;
let connectionString = 'mongodb://rickjames:rickjames123@ds141534.mlab.com:41534/rickjamessecretstash';

let Data = {
  dbInstance: null,
  getDbInstance: function() {
    let self = this;
    return new Promise((resolve, reject) => {
      if (!this.dbInstance) {
        MongoClient.connect(connectionString).then((db) => {
          this.dbInstance = db;
          resolve(this.dbInstance);
        })
        .catch((err) => {
          console.error(err);
        });
      }
    });
  },
  getImages: function () {
    return this.getDbInstance().then((db) => {
      return db.collection('randomcarimages').find({}, {'url': 1});
    })
    .then((images) => {
      return images.toArray();
    })
    .then((images) => {
      return images;
    });
  },
  getComments: function () {
    return this.getDbInstance().then((db) => {
      return db.collection('randombackfirescomments').find({});
    })
    .then((comments) => {
      return comments.toArray();
    })
    .then((comments) => {
      return comments;
    })
  }
};
/*
Data.getImages().then((res) => {
  console.log(res);
});

Data.getComments().then((res) => {
  console.log(res);
});
*/ 
module.exports = Data;