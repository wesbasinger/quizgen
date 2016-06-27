var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');

var api = require('./db/api');
var config = require('./db/config');

var port = process.env.PORT || 3000;

app.set('superSecret', config.secret);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

app.use(bodyParser());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url.slice(0,20)}' - ${JSON.stringify(req.body)}`);
	next();
});

app.get('/', function(req, res, next) {
  res.sendFile('/public/index.html');
});

app.get('/quizzes', function(req, res, next) {
		api.getQuizzes(function(docs) {
			res.json(docs);
		});
});

/*
app.post('/', function(req, res, next) {
	api.getUser({email: req.body.email}, function(doc) {
		if (!doc) {
			res.render('index', {error: "Authentication failed, user not found."});
		} else if (doc) {
			if (doc.password != req.body.password) {
				res.render('index', {error: "Authentication failed, password is not correct."});
			} else {
				var token = jwt.sign(doc, app.get('superSecret'));
				res.redirect('/quizzes/jwt/'+token);
			}
		}
	});
});


app.get('/quiz/:slug/jwt/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
				api.getQuiz(req.params.slug, function(doc) {
					res.render('quiz', {quiz:doc, jwt:token, error:null, email: decoded.email});
				});
			}
		});
	}
});

app.post('/quiz/:slug/jwt/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
				api.gradeQuiz(req.params.slug, req.body, function(passedResult) {
					api.pushResults(decoded.email, passedResult, function() {
						res.redirect('/results/jwt/'+token);
					});
				});

			}
		});
	}

});

app.get('/results/jwt/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
					api.getResults(decoded.email, function(docs) {
						res.render('results', {results:docs, jwt:token, error:null, email: decoded.email});
					});
			}
		});
	}

});

app.get('/register', function(req, res, next) {
	res.render('register', {error:null, jwt:null});
});

app.post('/register', function(req, res, next) {
	if(req.body.password !== req.body.confirmPassword) {
		res.render('register', {error:"Passwords do not match!"});
	} else {
		api.makeUser(
			{
				email:req.body.email,
				password:req.body.password,
				createdDate: new Date()}, function() {
					res.redirect('/');
				});
	}
});

app.get('/delete/:dateHash/jwt/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
					api.deleteResult(decoded.email, req.params.dateHash, function(){
						res.redirect('/results/jwt/'+token);
					});
			}
		});
	}

})

app.get('*', function(req, res) {
	res.render('notFound', {error:"I don't know how you got here..."});
});
*/

app.listen(port);
console.log("App running at port 3000...");

module.exports = app;
