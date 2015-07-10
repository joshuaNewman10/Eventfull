/** @jsx React.DOM */
var React = require('react');
var AppViewActions = require('../../actions/view-action-creator');

var MonthPrevButton = React.createClass({
  handleClick: function () {
    //TEMP The 'prev' argument passed in will be changed in the real impelementation
    AppViewActions.getMonthData('2015-04-01');
  },
  render: function () {
    return (
      <div className="arrow arrow-left" onClick={this.handleClick}>
      </div>
    );
  }
});

module.exports = MonthPrevButton;
