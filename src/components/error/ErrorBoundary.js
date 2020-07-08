import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventId: null };

    this.clearState = this.clearState.bind(this);
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });

    if (process.env.NODE_ENV === 'propduction') {
      Sentry.withScope((scope) => {
        scope.setTag('Custom-tag', 'ErrorBoundary');
        scope.setLevel('Error');
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    }
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;
