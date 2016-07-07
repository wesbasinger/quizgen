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
    alert("You want to submit your form..")
  },

  render() {
    return(
      <div>
        <h1>Please Login to Continue</h1>
        <form>
          <label>Email</label>
          <input type="email" required name="email" onChange={this.handleEmailChange}/>
          <label>Password</label>
          <input type="password" required name="password" onChange={this.handlePasswordChange}/>
          <button onClick={this.handleSubmission}>Submit</button>
        </form>
      </div>
    )
  }
});

module.exports = Login;
