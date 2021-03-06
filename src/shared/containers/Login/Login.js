import React, { Component, PropTypes } from 'react';
import { connect } from 'react-apollo';
import { reduxForm } from 'redux-form';

import validate from './validate';
import { LoginForm } from '../../components';
import { loginUser } from '../../redux/actions/auth';

@connect({
  mapStateToProps: (state) => {
    return {
      submitError: state.auth.error,
      authenticated: state.auth.authenticated
    };
  }
})
@reduxForm({
  form: 'login',
  fields: [ 'email', 'password' ],
  validate
})
export default class Login extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired
  };

  static contextTypes = {
    client: PropTypes.object.isRequired
  };

  onFormSubmit({ email, password }) {
    this.props.dispatch(loginUser({ client: this.context.client, email, password }));
  }

  render() {
    const { submitError, authenticated, fields, submitting, handleSubmit } = this.props;
    return (
      <LoginForm fields={fields} submitError={submitError} authenticated={authenticated}
        submitting={submitting} handleSubmit={handleSubmit(this.onFormSubmit.bind(this))} />
    );
  }
}
