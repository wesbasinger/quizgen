var React = require('react');
var $ = require('jquery');
var katex = require('katex');


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
		this.setState({submitted: true})
	},

	handleSave(e) {
		this.setState({saved:true})
		this.props.onSaveRequest({
			slug: this.state.resultObj.slug,
			numCorrect: this.state.resultObj.numCorrect,
			numQuestions: this.state.resultObj.numQuestions,
			dateHash: this.state.resultObj.dateHash,
			percentage: this.state.resultObj.percentage,
			timestamp: this.state.resultObj.timestamp
		});
		this.setState({responseObj: {}, resultObj: {}})
	},

	rawMarkup(expression) {
		if(expression==null) {
			return {__html: ""}
		} else if(expression.charAt(0)==="*"){
			return {
				__html: katex.renderToString(expression.slice(1))
			}
		} else {
			return {__html: expression}
		}
	},

	render() {
		if (this.state.submitted===true && this.state.saved===false) {
			return(
				<div>
					<div className="well">
					<h1>Results for {this.state.resultObj.slug.toUpperCase()}</h1>
					<h2>Submitted on {this.state.resultObj.timestamp}</h2>
					<p>Number of Questions: {this.state.resultObj.numQuestions}</p>
					<p>Number Correct: {this.state.resultObj.numCorrect}</p>
					</div>
					{this.state.resultObj.pairs.map(pair => {
						return(
							<div className="well well-sm" key={pair.question}>
								<p>Question:
									<span dangerouslySetInnerHTML={this.rawMarkup(pair.question)} />
								</p>
								<p>Result: {pair.result}</p>
							</div>
						)
					})}
					<button className="btn btn-success" onClick={this.handleSave}>Save Result</button>
				</div>
			)
		} else if (this.state.submitted===true && this.state.saved===true) {
			return(
				<div className="jumbotron alert alert-success">
				<h1>Quiz results saved!!!</h1>
				</div>
			)
		} else {
			return(
				<form>
					<div className="well">
					<h1>{this.state.slug.toUpperCase()}</h1>
					<h2>{this.state.description}</h2>
					</div>
					{this.state.questions.map(question => {
						return(
							<div className="well well-sm" key={question.index}>
								<h2>
									<span dangerouslySetInnerHTML={this.rawMarkup(question.text)} />
								</h2>
								<h3>
									<span dangerouslySetInnerHTML={this.rawMarkup(question.caption)} />
								</h3>
								{question.choices.map(choice => {
									return(
										<div key={choice}>
											<input type="radio" name={question.text} value={choice} onChange={this.handleChange}/>
											<label>
												<span dangerouslySetInnerHTML={this.rawMarkup(choice)} />
											</label>
										</div>
									)
								})}
							</div>
						)
					})}
					<input className="btn btn-primary" type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			)
		}
	}
})

module.exports = Quiz;
