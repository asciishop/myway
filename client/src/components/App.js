import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BookNew from './book/BookNew';
import BookShow from './book/BookShow';
import Graph from "./book/Graph";
import ChapterNew from "./book/ChapterNew";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/book/new" component={BookNew} />
              <Route path="/chapter/new" component={ChapterNew} />
              <Route path="/graph/:bookid" component={Graph} />
              <Route exact path="/book/:_id" component={BookShow} />
              <Route path="/book" component={Dashboard} />
              <Route path="/" component={Landing} />

            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
