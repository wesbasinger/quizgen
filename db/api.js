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
  getQuizzes: function(callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('quizzes').find({}).toArray(function(err, docs) {
          if (err) {
            console.log(err);
          } else {
            callback(docs);
          }
        });
      }
    });
  },
  getQuiz: function(passedSlug, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('quizzes').findOne({slug:passedSlug}, function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            callback(doc);
          }
        });
      }
    });
  },
  gradeQuiz: function(passedSlug, submissions, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('quizzes').findOne({slug:passedSlug}, function(err, doc) {
          if (err) {
            console.log(err);
          } else {
            var results = {};
            results.slug = passedSlug;
            results.numQuestions = doc.questions.length; //works
            results.numCorrect = 0; // works
            results.timestamp = new Date();
            results.dateHash = results.timestamp.getYear().toString() + // make a date hash
              results.timestamp.getMonth().toString() +
              results.timestamp.getDay().toString() +
              results.timestamp.getHours().toString() +
              results.timestamp.getMinutes().toString() +
              results.timestamp.getSeconds().toString();
            results.pairs = [];
            for (var i=0; i<results.numQuestions; i++) {
              var currObj = {};
              var currQuestionText = doc.questions[i].text; //
              currObj["question"] = currQuestionText;
              var currAnswer = doc.questions[i].answer; //
              if (currAnswer==submissions[currQuestionText]) {
                results.numCorrect += 1;
                currObj["result"] = "correct";
              } else {
                currObj["result"] = "incorrect";
              }
              results.pairs.push(currObj);
            }
            results.percentage = (results.numCorrect / results.numQuestions)*100;
            callback(results);
          }
        });
      }
    });
  },
  pushResults: function(passedEmail, results, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('users').update({email: passedEmail},{"$push":{results:results}}, function() {
          callback();
        });
      }
    });
  },
  getResults: function(passedEmail, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('users')
        .aggregate([
          {$match:{email:passedEmail}},
          {$unwind:"$results"},
          {$project:
            {
              _id:0,
              slug:"$results.slug",
              numQuestions:"$results.numQuestions",
              numCorrect:"$results.numCorrect",
              percentage:"$results.percentage",
              timestamp:"$results.timestamp",
              dateHash: "$results.dateHash"}},
          {$limit:10},
          {$sort:{timestamp:-1}}]).toArray(function(err, docs) {
            callback(docs);
          });
      }
    });
  },
  makeUser: function(newUserObj, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if (err) {
        console.log(err);
      } else {
        db.collection('users').insertOne(newUserObj, function(err, result) {
          callback();
        });
      }
    });
  },
  deleteResult: function(passedEmail, passedDateHash, callback) {
    MongoClient.connect(config.uri, function(err, db) {
      if(err) {
        console.log(err);
      } else {
        db.collection('users').update(
          {email:passedEmail},
          {$pull:{results:{dateHash:passedDateHash}}},
          {multi:false}, function(err, result) {
            if(err) {
              console.log(err);
            } else {
              callback();
            }
        });
      }
    });
  }
};
