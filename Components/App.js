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

	handleLoginSubmission(data) {
		alert("Data bubbled to the top!" + JSON.stringify(data));
	},

	getInitialState() {
		return {
			user: "",
			token: ""
		}
	},



	render() {
		return(
			<div>
				<Header />
				{this.props.children &&
					React.cloneElement(
						this.props.children, {onLoginFormSubmit: this.handleLoginSubmission})}
				<Footer />
			</div>
		)
	}
});

module.exports = App;
