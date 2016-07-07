var React = require('react');

var Quiz = React.createClass({
	render() {
		return <h1>This is a {this.props.params.quizId} quiz.</h1>
	}
})

module.exports = Quiz;
