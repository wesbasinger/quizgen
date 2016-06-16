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
            for (var i=0; i<results.numQuestions; i++) {
              var currQuestionText = doc.questions[i].text; //
              var currAnswer = doc.questions[i].answer; //
              if (currAnswer==submissions[currQuestionText]) {
                results.numCorrect += 1;
                results[currQuestionText] = "correct";
              } else {
                results[currQuestionText] = "incorrect";
              }
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
        db.collection('users').update({email: passedEmail},{"$push":{results:results}});
        callback();
      }
    });
  }
};
