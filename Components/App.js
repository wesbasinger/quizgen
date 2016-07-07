var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render() {
		return(
			<div>
				Pick from the list
				<ul>
					<li><Link to="/quizzes">Quizzes</Link></li>
					<li><Link to="/quizzes/dummy">Dummy Quiz</Link></li>
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
var App = React.createClass({

	getInitialState() {
		return {
			email: "",
			token: ""
		}
	},

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

module.exports = App;
