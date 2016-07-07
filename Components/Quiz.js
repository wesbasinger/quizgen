var React = require('react');
var $ = require('jquery');

var Quiz = React.createClass({

	getInitialState() {
		return{
			slug: "",
			description: "",
			createdDate: "",
			questions: []
		}
	},

	componentDidMount() {
		$.ajax({
			url: 'api/quiz/' + this.props.params.quizId,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({
					slug: data.slug,
					description: data.description,
					createdDate: data.createdDate,
					questions: data.questions
				});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},

	render() {
		return(
			<form>
				<h1>{this.state.slug.toUpperCase()}</h1>
				<h2>{this.state.description}</h2>
				{this.state.questions.map(question => {
					return(
						<div>
							<h2>{question.text}</h2>
							<h3>{question.caption}</h3>
							{question.choices.map(choice => {
								return(
									<div>
										<input type="radio" name={question.text} value={choice} />
										<label>{choice}</label>
									</div>
								)
							})}
						</div>
					)
				})}
			</form>
		)
	}
})

module.exports = Quiz;
