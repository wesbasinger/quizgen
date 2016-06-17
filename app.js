var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');

var api = require('./db/api');
var config = require('./db/config');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('superSecret', config.secret);

//app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res) {
	api.getUser({email: req.body.email}, function(doc) {
		if (!doc) {
			res.render('index', {error: "Authentication failed, user not found."});
		} else if (doc) {
			if (doc.password != req.body.password) {
				res.render('index', {error: "Authentication failed, password is not correct."});
			} else {
				var token = jwt.sign(doc, app.get('superSecret'));
				res.redirect('/quizzes?jwt='+token);
			}
		}
	});
});

app.get('/quizzes', function(req, res) {
	var token = req.query.jwt;
	console.log(token);
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
				var email = decoded.email;
				api.getQuizzes(function(docs) {
					res.render('quizzes', {data:docs, jwt: token});
				});
			}
		});
	}
});

app.get('/quiz/:slug', function(req, res) {
	api.getQuiz(req.params.slug, function(doc) {
		res.render('quiz', {quiz:doc, email:req.query.email});
	});
});

app.post('/quiz/:slug/email/:email', function(req, res) {
	api.gradeQuiz(req.params.slug, req.body, function(passedResult) {
		api.pushResults(req.params.email, passedResult, function() {
			res.redirect('/results/email/'+req.params.email);
		});
	});
});

app.get('/results/email/:email', function(req, res) {
	api.getResults(req.params.email, function(docs) {
		res.render('results', {results:docs});
	});
});

app.listen(3000);
console.log("App running at port 3000...");

module.exports = app;
