var React = require('react');
var Header = require('./parts/Header');
var Footer = require('./parts/Footer');
var QuizList = require('./parts/QuizList');
var Quiz = require('./parts/Quiz');

var APP = React.createClass({

  render() {
    return (
      <div>
        <Header />
        <div className="row">
          <QuizList />
          <Quiz />
        </div>
        <Footer />
      </div>
    );
  }

});

module.exports = APP;
