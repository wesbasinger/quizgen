var React = require('react');

var Login = React.createClass({

  getInitialState() {
    return {
      formEmail: "",
      formPassword: ""
    }
  },

  handleEmailChange(e, value) {
    this.setState({formEmail: e.target.value});
  },

  handlePasswordChange(e, value) {
    this.setState({formPassword: e.target.value})
  },

  handleSubmission(e) {
    e.preventDefault();
    var email = this.state.formEmail.trim();
    var password = this.state.formPassword.trim();
    this.props.onLoginFormSubmit({email:email, password:password});
  },

  render() {
    if (this.props.tokenState === "") {
      return(
        <div className="jumbotron">
          <h1>Please Login to Continue</h1>
          <div className="well">
          <form role="form" onSubmit={this.handleSubmission}>
            <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              required
              name="email"
              onChange={this.handleEmailChange}
              value={this.state.formEmail}/>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              onChange={this.handlePasswordChange}
              value={this.state.formPassword}/>
            </div>
            <input className="btn btn-primary" type="submit" value="POST" />
          </form>
          </div>
        </div>
      )
    } else {
      return(
        <div className="alert alert-success jumbotron">
        <h1>Welcome to the quiz app.  Use the nav bar.</h1>
        </div>
      )
    }
  }
});

module.exports = Login;
