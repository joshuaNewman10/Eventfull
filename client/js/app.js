/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var Month = require('./components/month/month.js');
var Day = require('./components/day/day.js');
var Week = require('./components/week/week.js');
var Actionbar = require('./components/actionbar/action-bar.js');
var Sidebar = require('./components/sidebar/sidebar.js');
var classnames = require('classnames');

var App = React.createClass({
  getInitialState: function () {
      return {
        actionbarOpen: false,
        hashRoute: ''
      };
    },

  componentDidMount: function () {
    window.onhashchange = this.handleHashChange;
    window.onbeforeunload = this.handleHashChange;
  },

  handleHashChange: function () {
    console.log('it worked!');
    var newHash = window.location.hash;
    var actionbarHashActivated = /#actionbar.*/.test(newHash);
    var actionbarOpen = this.state.actionbarOpen;

    if (!actionbarHashActivated) {
      this.setState({ actionbarOpen: false });
    } else {
      this.setState({ actionbarOpen: true, hashRoute: newHash });
    }

  },

  render: function () {
    var hashRoute = this.state.hashRoute;
    var actionbarOpen = this.state.actionbarOpen;

    var classes = classnames({
    'col-md-8': actionbarOpen,
    'schedule-push-right': actionbarOpen,
    'col-md-10': !actionbarOpen,
    'col-md-offset-2': true,
    'schedule-default': true,
    'main': true
  });

    return (
      <div className="row" >
        <Sidebar />
        <Actionbar actionbarOpen={actionbarOpen} hashRoute={hashRoute} />
        <div className= {classes}>
          <RouteHandler />
        </div>
      </div>
    );
}
});

App = DragDropContext(HTML5Backend)(App);

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Month} />
    <Route name="month" path="month" handler={Month} />
    <Route name="week"  path ="week" handler={Week} />
    <Route name="day"   path="day" handler={Day} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Root) {
  React.render(<Root/>, document.getElementById('content'));
});
