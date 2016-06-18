var MongoClient = require("mongodb").MongoClient;
var config = require('./config');

module.exports = {
  getGradesByUser: function(passedEmail, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('users').aggregate([
          {$match: {email:passedEmail}},
          {$unwind:"$results"},
          {$group:{_id:"$results.slug", maxScore:{$max:"$results.percentage"}}},
          {$project:{percentage:"$maxScore"}}]).toArray(function(err, docs) {
            if (err) {
              console.log(err);
            } else {
              callback(docs);
            }
          });
      }
    });
  },
  insertQuiz: function(quizDocument) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        if (!quizDocument.slug || quizDocument.questions.length < 1) {
          return null;
        } else {
          db.collection('quizzes').insertOne(quizDocument);
        }
      }
    });
  },
  deleteQuiz: function(passedSlug) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('quizzes').deleteOne({slug:passedSlug});
      }
    });
  },
  getGradesBySlug: function(passedSlug, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('users')
        .aggregate([
          {$unwind:"$results"},
          {$match:{"results.slug":"w1d1"}},
          {$group:{_id:"$email", score:{$max:"$results.percentage"}}}
        ]).toArray(function(err, docs) {
          if (err) {
            console.log(err);
          } else {
            callback(docs);
          }
        });
      }
    });
  }
};
