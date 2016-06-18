var readlineSync = require('readline-sync');
var admin = require('./db/admin');
var api = require('./db/api');

function createQuiz() {
  var quiz = {
    createdDate: new Date(),
    questions: []
  };
  var slug = readlineSync.question("What is the slug? ");
  var re = /^w\d*d\d*$/;
  if (re.test(slug) === false) {
    console.log("Nope, not a valid slug.");
    process.exit(0);
  } else {
    quiz.slug = slug;
  }
  var description = readlineSync.question("What is the description? ");
  quiz.description = description;
  var numQuestions = readlineSync.question("How many questions do you want? ");
  for (var i=0; i < numQuestions; i++) {
    var currQuestion = {index:i, choices:[]};
    var questionText = readlineSync.question("What is the text of this question? ");
    currQuestion.text = questionText;
    var numChoices = readlineSync.question("How many answer choices? ");
    for (var j=0; j < numChoices; j++) {
      var choiceText = readlineSync.question("What is the answer choice? ");
      currQuestion.choices.push(choiceText);
      if (!currQuestion.answer) {
        if (readlineSync.keyInYN('Is this the correct answer? ')) {
          currQuestion.answer = choiceText;
        }
      }
    }
    quiz.questions.push(currQuestion);
  }
  return quiz;
}

function deleteQuiz() {
  console.log("Welcome to the deletion portion of the interface.");
  var slug = readlineSync.question("Enter the slug of a quiz you wish to delete. ");
  api.getQuiz(slug, function(doc) {
    console.log("Is this the quiz you want to delete? ")
    console.log(JSON.stringify(doc));
    if (readlineSync.keyInYN('Confirm...')) {
      admin.deleteQuiz(slug);
    }
  });
}


console.log("Welcome to the admin interface.");
var mainFunctions = ['Create', 'Delete', 'Grades by Slug'];
var index = readlineSync.keyInSelect(mainFunctions, "Which function do you want?");

if (mainFunctions[index] == 'Create') {
  var quiz = createQuiz();
  console.log("Printing quiz to console...");
  console.log(quiz);
  if(readlineSync.keyInYN("Do you want to save this quiz to the database? ")) {
    admin.insertQuiz(quiz);
  }
} else if (mainFunctions[index] == 'Delete') {
  deleteQuiz();
  process.exit();
} else if (mainFunctions[index] == 'Grades by Slug') {
  var slug = readlineSync.question("Which slug do you want to run grades for? ");
  var re = /^w\d*d\d*$/;
  if (re.test(slug) === false) {
    console.log("Nope, not a valid slug.");
    process.exit(0);
  } else {
    admin.getGradesBySlug(slug, function(docs) {
      console.log(docs);
      process.exit();
    });
  }
}
