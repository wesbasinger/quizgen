var React = require('react');
var Link = require('react-router').Link;

var Quizzes = React.createClass({
	render() {
		return(
			<div>
				<div className="jumbotron">
				<h1>All Quizzes</h1>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<td>Link</td>
							<td>Description</td>
							<td>Creation Date</td>
							<td>Number of Questions</td>
						</tr>
					</thead>
					<tbody>
						{this.props.quizzes.map(quiz => {
							var linkString = "/quizzes/" + quiz.slug;
							return(
								<tr key={quiz._id}>
									<td><Link to={linkString}>{quiz.slug.toUpperCase()}</Link></td>
									<td>{quiz.description}</td>
									<td>{quiz.createdDate}</td>
									<td>{quiz.questions.length}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
})

module.exports = Quizzes;
