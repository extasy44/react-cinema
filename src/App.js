import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import './App.scss';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import ErrorBoundary from './components/error/ErrorBoundary';
import { appRoutes } from './redux/actions/routes';

const App = (props) => {
  const { appRoutes } = props;
  const routesArray = [
    {
      path: '/',
      id: 1,
      component: Main
    },
    {
      id: 2,
      path: '/:id/:name/:details',
      component: Details
    }
  ];

  useEffect(() => {
    appRoutes(routesArray);
  }, [routesArray, appRoutes]);

  return (
    <Router>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <div className="app">
        <Switch>
          {routesArray.map((route) => (
            <Route key={route.id} exact path={route.path} component={route.component} {...props} />
          ))}
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = {
  appRoutes: PropTypes.func
};

export default connect(null, { appRoutes })(App);
