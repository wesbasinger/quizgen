var React = require('react');

var Header = React.createClass({

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <ul className="nav navbar-nav">
          <li className="nav-item">Home</li>
        </ul>
      </nav>
    );
  }

});

module.exports = Header;
