var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');

var api = require('./db/api');
var config = require('./db/config');

var port = process.env.PORT || 3000;

app.set('superSecret', config.secret);

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url.slice(1,20)}' - ${JSON.stringify(req.body)}`);
	next();
});

app.get('/', function(req, res, next) {
  res.sendFile('/public/index.html');
});


app.post('/api/login', function(req, res, next) {
	api.getUser({email: req.body.email}, function(doc) {
		if (!doc) {
			res.json({error: "Authentication failed, user not found."});
		} else if (doc) {
			if (doc.password != req.body.password) {
				res.json({error: "Authentication failed, password is not correct."});
			} else {
				var token = jwt.sign(doc, app.get('superSecret'));
				res.json({token: token});
			}
		}
	});
});


app.get('/api/quizzes', function(req, res, next) {
	api.getQuizzes(function(docs) {
		res.json(docs);
	});
});

app.get('/api/quiz/:slug', function(req, res, next) {
	api.getQuiz(req.params.slug, function(doc) {
		res.json(doc);
	});
});

app.post('/api/quiz/:slug/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
				api.gradeQuiz(req.params.slug, req.body, function(passedResult) {
					res.json(passedResult);
				});

			}
		});
	}
});

app.post('/api/save/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
				api.pushResults(decoded.email, req.body, function() {
					res.json({msg: "success"});
				});
			}
		});
	}
});

app.get('/api/results/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
					api.getResults(decoded.email, function(docs) {
						res.json(docs);
					});
			}
		});
	}
});

app.get('/api/delete/:dateHash/:jwt', function(req, res, next) {
	var token = req.params.jwt;
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.render('notFound', {error: "Failed to authenicate token."});
			} else {
					api.deleteResult(decoded.email, req.params.dateHash, function(){
						res.json({msg:"success"});
					});
			}
		});
	}
});

/*

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
*/

app.listen(port);
console.log("App running at port 3000...");

module.exports = app;
