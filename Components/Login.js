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
        <div>
          <h1>Please Login to Continue</h1>
          <form onSubmit={this.handleSubmission}>
            <label>Email</label>
            <input
              type="text"
              required
              name="email"
              onChange={this.handleEmailChange}
              value={this.state.formEmail}/>
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              onChange={this.handlePasswordChange}
              value={this.state.formPassword}/>
            <input type="submit" value="POST" />
          </form>
        </div>
      )
    } else {
      return(
        <h1>Welcome to the quiz app.  Use the nav bar.</h1>
      )
    }
  }
});

module.exports = Login;
