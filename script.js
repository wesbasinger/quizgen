var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;

var Quiz = require('./Components/Quiz');
var Quizzes = require('./Components/Quizzes');
var App = require('./Components/App')



ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/quizzes" component={Quizzes} />
			<Route path="/quizzes/:quizId" component={Quiz} />
		</Route>
	</Router>
), document.getElementById('react-container'))
