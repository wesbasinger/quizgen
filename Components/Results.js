var React = require('react');

var Results = React.createClass({

  getInitialState() {
    grades: []
  },

  componentDidMount() {
    $.ajax({
      url: 'api/results/' + this.props.tokenState,
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
      <h1> This is the results view</h1>
    )
  }
});

module.exports = Results;
