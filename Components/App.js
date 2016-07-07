var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Header = React.createClass({
	render() {
		if (this.props.token && this.props.user) {
			return(
				<div>
					<nav>
						Welcome {this.props.user}.  You are logged in.
							Pick from the list
							<ul>
								<li><Link to="/quizzes">Quizzes</Link></li>
								<li><Link to="/quizzes/dummy">Dummy Quiz</Link></li>
								<li><Link to="/logout">Logout</Link></li>
							</ul>
					</nav>
				</div>
			)
		} else {
			return(
				<div>
					<nav>
						Login to see options.
					</nav>
				</div>
			)
		}
	}
})

var Footer = React.createClass({
	render() {
		return <nav>This is a footer</nav>
	}
})
var App = React.createClass({

	handleLoginSubmission(loginObj) {
		$.ajax({
		  url: "api/login",
		  dataType: 'json',
		  type: "POST",
		  data: {email: loginObj.email, password: loginObj.password},
		  success: function(data) {
		    this.setState({token:data.token, errMsg:data.error, user:loginObj.email});
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
				<Header token={this.state.token} user={this.state.user}/>
				{
					React.cloneElement(this.props.children, {tokenState: this.state.token, onLoginFormSubmit: this.handleLoginSubmission})}
				<Footer />
			</div>
		)
	}
});

module.exports = App;
