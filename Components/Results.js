var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Results = React.createClass({

  getDefaultProps() {
    return {
      grades: []
    }
  },

  handleDelete(e) {
    var indexToDelete;
    var dateHash = e.target.value;
    var currentGrades = this.props.grades;
    for (var i=0; i < currentGrades.length; i++) {
      if (currentGrades[i].dateHash === dateHash) {
        indexToDelete = i;
      }
    }
    currentGrades.splice(indexToDelete, 1);
    this.props.onDeleteRequest(dateHash);
  },

  render() {
    if (this.props.grades.length === 0) {
      return(
        <div className="jumbotron">
        <h1>No Grades Available...</h1>
        </div>
      )
    } else {
      return(
        <div>
          <div className="jumbotron">
          <h1>Grades</h1>
          </div>
          <table className="table table-striped">
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
              {this.props.grades.map(grade => {
                var linkString = "/quizzes/" + grade.slug;
                return(
                  <tr key={grade.dateHash}>
                    <td><Link to={linkString}>{grade.slug.toUpperCase()}</Link></td>
                    <td>{grade.timestamp}</td>
                    <td>{grade.numQuestions}</td>
                    <td>{grade.numCorrect}</td>
                    <td>{grade.percentage}</td>
                    <td><button className="btn btn-danger" onClick={this.handleDelete} value={grade.dateHash}>Delete</button></td>
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
