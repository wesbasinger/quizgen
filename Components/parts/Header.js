var React = require('react');

var Header = React.createClass({

  render() {
    return (
      <header className="row">
        <div className="col-xs-10">
          <h1>This is the header...</h1>
        </div>
        <div className="col-xs-2">
          <span>This fills the rest of the span.</span>
        </div>
      </header>
    );
  }

});

module.exports = Header;
