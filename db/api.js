var MongoClient = require("mongodb").MongoClient;
var config = require('./config');

module.exports = {
  getUser : function(userObj, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      }
      else {
        db.collection('users').findOne(userObj, function(err, doc) {
          callback(doc);
        });
      }
    });
  },
}
