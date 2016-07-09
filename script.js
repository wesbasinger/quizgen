var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var IndexRoute = require('react-router').IndexRoute;

var Quiz = require('./Components/Quiz');
var Quizzes = require('./Components/Quizzes');
var App = require('./Components/App');
var Login = require('./Components/Login');
var Results = require('./Components/Results');



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Login} />
			<Route path="/quizzes" component={Quizzes} />
			<Route path="/quizzes/:quizId" component={Quiz} />
			<Route path="/results" component={Results} />
		</Route>
	</Router>
), document.getElementById('react-container'))
