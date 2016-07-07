var React = require('react');
var $ = require('jquery');

var QuizList = React.createClass({
  getInitialState() {
    return {
      quizzes: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get('/quizzes', function (result) {
      this.setState({
        quizzes: result
      });
    }.bind(this));
  },

  render() {
    return (
        <div className="col-md-3">
          <h1>Recent Quizzes</h1>
          <ul>
          {
            this.state.quizzes.map(function(quiz) {
              return <li key={quiz._id}><button>{quiz.slug.toUpperCase()}</button></li>;
            })
          }
          </ul>
        </div>
    )
  }

});

module.exports = QuizList;
