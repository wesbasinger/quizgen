var React = require('react');
var $ = require('jquery');

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

    // $.ajax({
    //   url: "api/login",
    //   dataType: 'json',
    //   type: "POST",
    //   data: {email: email, password: password},
    //   success: function(data) {
    //     this.setState({token:data.token});
    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.error(status, err.toString());
    //   }.bind(this)
    // });

    this.props.onLoginFormSubmit({email:email, password:password});
  },

  render() {
    return(
      <div>
        <h1>Please Login to Continue</h1>
        <form onSubmit={this.handleSubmission}>
          <label>Email</label>
          <input
            type="email"
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
  }
});

module.exports = Login;
