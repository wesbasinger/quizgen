var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Header = React.createClass({
	render() {
		if (this.props.token && this.props.user) {
			return(
				<div>
					<nav className="navbar navbar-default">
						<div className="container-fluid">
						<div className="navbar-header">
						Welcome {this.props.user}.  You are logged in.
							Pick from the list.
						</div>
							<ul className="nav navbar-nav">
								<li><Link to="/quizzes">Quizzes</Link></li>
								<li><Link to="/results">Grades</Link></li>
								<li><Link to="/"><button className="btn btn-primary" onClick={this.props.onLogoutRequest}>Logout</button></Link></li>
							</ul>
						</div>
					</nav>
				</div>
			)
		} else {
			return(
				<div>
					<nav>
						<a href="/">Login</a> to see options.
					</nav>
				</div>
			)
		}
	}
})

var Footer = React.createClass({
	render() {
		return <nav>Site created and maintained by Wes Basinger | wbasinger@villagetechschools.org</nav>
	}
})
var App = React.createClass({

	getInitialState() {
		return {
			user: "",
			token: "",
			errMsg: "",
			quizzes: [],
			grades: []
		}
	},

	componentDidMount() {
		$.ajax({
			url: 'api/quizzes',
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({quizzes: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},


	logout() {
		this.setState({user:"", token:""});
	},

	handleDeleteRequest(dateHash) {
		$.ajax({
			url: 'api/delete/' + dateHash + '/' + this.state.token,
			dataType: 'json',
			method: "GET",
			success: function(data) {
				$.ajax({
					url: 'api/results/' + this.state.token,
					dataType: 'json',
					method: "GET",
					success: function(data) {
						this.setState({grades: data});
					}.bind(this),
					error: function(xhr, status, err) {
						console.error(status, err.toString());
					}.bind(this)
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},

	handleLoginSubmission(loginObj) {
		$.ajax({
		  url: "api/login",
		  dataType: 'json',
		  type: "POST",
		  data: {email: loginObj.email, password: loginObj.password},
		  success: function(data) {
		    this.setState({token:data.token, errMsg:data.error, user:loginObj.email});
				$.ajax({
					url: 'api/results/' + this.state.token,
					dataType: 'json',
					method: "GET",
					success: function(data) {
						this.setState({grades: data});
					}.bind(this),
					error: function(xhr, status, err) {
						console.error(status, err.toString());
					}.bind(this)
				});
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(status, err.toString());
		  }.bind(this)
		});
	},

	handleSaveResult(responseObj) {
		$.ajax({
			url: 'api/save/' + this.state.token,
			dataType: 'json',
			method: "POST",
			data: responseObj,
			success: function(data) {
				$.ajax({
					url: 'api/results/' + this.state.token,
					dataType: 'json',
					method: "GET",
					success: function(data) {
						this.setState({grades: data});
					}.bind(this),
					error: function(xhr, status, err) {
						console.error(status, err.toString());
					}.bind(this)
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},

	render() {
		return(
			<div>
				<Header token={this.state.token} user={this.state.user} onLogoutRequest={this.logout}/>
				{
					React.cloneElement(this.props.children,
						{
							tokenState: this.state.token,
							quizzes: this.state.quizzes,
							grades: this.state.grades,
							onLoginFormSubmit: this.handleLoginSubmission,
							onSaveRequest: this.handleSaveResult,
							onDeleteRequest: this.handleDeleteRequest})}
				<Footer />
			</div>
		)
	}
});

module.exports = App;
