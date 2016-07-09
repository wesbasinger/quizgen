var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Results = React.createClass({

  getInitialState() {
    return {
      grades: []
    }
  },

  componentDidMount() {
    $.ajax({
      url: 'api/results/' + this.props.tokenState,
      dataType: 'json',
      method: "GET",
      success: function(data) {
        this.setState({grades: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  handleDelete(e) {
    var indexToDelete;
    var dateHash = e.target.value;
    var currentGrades = this.state.grades;
    for (var i=0; i < currentGrades.length; i++) {
      if (currentGrades[i].dateHash === dateHash) {
        indexToDelete = i;
      }
    }
    //		players.splice(players.indexOf(socket), 1);
    currentGrades.splice(indexToDelete, 1);
    this.setState({grades: currentGrades});
    $.ajax({
      url: 'api/delete/' + dateHash + '/' + this.props.tokenState,
      dataType: 'json',
      method: "GET",
      success: function(data) {
        //console.log(data.msg);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  },

  render() {
    if (this.state.grades.length === 0) {
      return(
        <h1>Loading...</h1>
      )
    } else {
      return(
        <div>
          <h1>Grades</h1>
          <table>
            <thead>
              <tr>
                <td>Link</td>
                <td>Timestamp</td>
                <td>Number of Questions</td>
                <td>Number Correct</td>
                <td>Percentage</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {this.state.grades.map(grade => {
                var linkString = "/quizzes/" + grade.slug;
                return(
                  <tr key={grade.dateHash}>
                    <td><Link to={linkString}>{grade.slug.toUpperCase()}</Link></td>
                    <td>{grade.timestamp}</td>
                    <td>{grade.numQuestions}</td>
                    <td>{grade.numCorrect}</td>
                    <td>{grade.percentage}</td>
                    <td><button onClick={this.handleDelete} value={grade.dateHash}>Delete</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
  }
});

module.exports = Results;
