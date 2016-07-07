var React = require('react');
var $ = require('jquery');
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
		$.ajax({
		  url: "api/login",
		  dataType: 'json',
		  type: "POST",
		  data: {email: data.email, password: data.password},
		  success: function(data) {
		    this.setState({token:data.token, errMsg:data.error});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(status, err.toString());
		  }.bind(this)
		});
	},

	getInitialState() {
		return {
			user: "",
			token: "",
			errMsg: ""
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
