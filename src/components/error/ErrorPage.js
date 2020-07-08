import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './ErrorPage.scss';

import { setError } from '../../redux/actions/errors';

const ErrorPage = ({ clearState, setError }) => {
  const history = useHistory();

  const navigateToHomePage = () => {
    clearState();
    setError({ message: '', statusCode: null });
    history.push('/');
  };

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong</p>
      <div className="error-link" onClick={() => navigateToHomePage()}>
        <i className="icon-home" /> Go back to home page
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  clearState: PropTypes.func,
  setError: PropTypes.func
};

export default connect(null, { setError })(ErrorPage);
