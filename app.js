var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
	next();
});

app.get('/', function(req, res) {
  res.end();
});

app.listen(3000);
console.log("App running at port 3000....");

module.exports = app;
