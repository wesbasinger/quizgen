var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;


var App = React.createClass({
	render() {
		return(
			<div>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
});

var Quizzes = React.createClass({
	render() {
		return <h1>These are quizzes.</h1>
	}
})

var Quiz = React.createClass({
	render() {
		return <h1>This is a {this.props.params.quizId} quiz.</h1>
	}
})

var Header = React.createClass({
	render() {
		return(
			<div>
				Pick from the list
				<ul>
					<li><Link to="/quizzes">Quizzes</Link></li>
					<li><Link to="quizzes/dummy">Dummy Quiz</Link></li>
				</ul>
			</div>
		)
	}
})

var Footer = React.createClass({
	render() {
		return <nav>This is a footer</nav>
	}
})

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/quizzes" component={Quizzes} />
			<Route path="/quizzes/:quizId" component={Quiz} />
		</Route>
	</Router>
), document.getElementById('react-container'))
