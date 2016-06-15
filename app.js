var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var api = require('./db/api');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.get('/', function(req, res) {
  res.end();
});

app.post('/', function(req, res) {
	if(!req.body.email && !req.body.password) {
		res.send({success: false});
	} else {
		api.getUser({email: req.body.email, password: req.body.password}, function(doc) {
			console.log(doc);
		});
	}
});

app.listen(3000);
console.log("App running at port 3000...");

module.exports = app;
