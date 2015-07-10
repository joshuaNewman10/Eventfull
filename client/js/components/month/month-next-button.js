/** @jsx React.DOM */
var React = require('react');
var AppViewActions = require('../../actions/view-action-creator');

var MonthNextButton = React.createClass({
  handleClick: function () {
    //TEMP The argument passed in will be a date in the real implementation
    AppViewActions.getMonthData('2015-06-01');
  },
  render: function () {
    return  (
      <div className="arrow arrow-right" onClick={this.handleClick}>
      </div>
    );
  }
});

module.exports = MonthNextButton;
