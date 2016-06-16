var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var api = require('./db/api');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

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
	if(!req.body.email && !req.body.password) {
		res.render('index');
	} else {
		api.getUser({email: req.body.email, password: req.body.password}, function(doc) {
			var encodedEmail = encodeURIComponent(req.body.email);
			res.redirect('/quizzes?email=' + encodedEmail);
		});
	}
});

app.get('/quizzes', function(req, res) {
	api.getQuizzes(function(docs) {
		res.render('quizzes', {data:docs});
	});
});

app.listen(3000);
console.log("App running at port 3000...");

module.exports = app;
