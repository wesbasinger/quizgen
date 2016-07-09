var React = require('react');
var $ = require('jquery');

var Quiz = React.createClass({

	getInitialState() {
		return{
			slug: "",
			description: "",
			createdDate: "",
			questions: [],
			submitted: false,
			responseObj: {},
			resultObj: {},
			saved: false
		}
	},

	handleChange(e) {
		var oldResponseState = this.state.responseObj;
		var newPair = {};
		newPair[e.target.name] = e.target.value;
		var combined = $.extend(oldResponseState, newPair);
		this.setState({responseObj: combined});
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

	handleSubmit(e) {
		e.preventDefault();
		$.ajax({
			url: 'api/quiz/' + this.props.params.quizId + '/' + this.props.tokenState,
			dataType: 'json',
			method: "POST",
			data: this.state.responseObj,
			success: function(data) {
				this.setState({resultObj: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
		this.setState({responseObj: {}, submitted: true})
	},

	handleSaveResult(e) {
		$.ajax({
			url: 'api/save/' + this.props.tokenState,
			dataType: 'json',
			method: "POST",
			data: {
				dateHash: this.state.resultObj.dateHash,
				numCorrect: this.state.resultObj.numCorrect,
				numQuestions: this.state.resultObj.numQuestions,
				percentage: this.state.resultObj.percentage,
				slug: this.state.resultObj.slug,
				timestamp: this.state.resultObj.timestamp
			},
			success: function(data) {
				this.setState({saved: true});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(status, err.toString());
			}.bind(this)
		});
	},

	render() {
		if (this.state.submitted===true && this.state.saved===false) {
			return(
				<div>
					<h1>Results for {this.state.resultObj.slug.toUpperCase()}</h1>
					<h2>Submitted on {this.state.resultObj.timestamp}</h2>
					<p>Number of Questions: {this.state.resultObj.numQuestions}</p>
					<p>Number Correct: {this.state.resultObj.numCorrect}</p>
					{this.state.resultObj.pairs.map(pair => {
						return(
							<div>
								<p>Question: {pair.question}</p>
								<p>Result: {pair.result}</p>
							</div>
						)
					})}
					<button onClick={this.handleSaveResult}>Save Result</button>
				</div>
			)
		} else if (this.state.submitted===true && this.state.saved===true) {
			return(
				<h1>Quiz results saved!!!</h1>
			)
		} else {
			return(
				<form>
					<h1>{this.state.slug.toUpperCase()}</h1>
					<h2>{this.state.description}</h2>
					{this.state.questions.map(question => {
						return(
							<div key={question.index}>
								<h2>{question.text}</h2>
								<h3>{question.caption}</h3>
								{question.choices.map(choice => {
									return(
										<div>
											<input type="radio" name={question.text} value={choice} onChange={this.handleChange} key={choice}/>
											<label>{choice}</label>
										</div>
									)
								})}
							</div>
						)
					})}
					<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			)
		}
	}
})

module.exports = Quiz;
