import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { injectIntl, FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { otpVerify, verifyCredentials, switchAccount } from 'soapbox/actions/auth';
import Button from 'soapbox/components/button';
import { Form, FormActions, FormGroup, Input } from 'soapbox/components/ui';

const messages = defineMessages({
  otpCodeHint: { id: 'login.fields.otp_code_hint', defaultMessage: 'Enter the two-factor code generated by your phone app or use one of your recovery codes' },
  otpCodeLabel: { id: 'login.fields.otp_code_label', defaultMessage: 'Two-factor code:' },
});

export default @connect()
@injectIntl
class OtpAuthForm extends ImmutablePureComponent {

  state = {
    isLoading: false,
    code_error: '',
    shouldRedirect: false,
  }

  static propTypes = {
    intl: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    mfa_token:  PropTypes.string,
  };

  getFormData = (form) => {
    return Object.fromEntries(
      Array.from(form).map(i => [i.name, i.value]),
    );
  }

  handleSubmit = (event) => {
    const { dispatch, mfa_token } = this.props;
    const { code } = this.getFormData(event.target);
    dispatch(otpVerify(code, mfa_token)).then(({ access_token }) => {
      this.setState({ code_error: false });
      return dispatch(verifyCredentials(access_token));
    }).then(account => {
      this.setState({ shouldRedirect: true });
      return dispatch(switchAccount(account.id));
    }).catch(error => {
      this.setState({ isLoading: false, code_error: true });
    });
    this.setState({ isLoading: true });
    event.preventDefault();
  }

  render() {
    const { intl } = this.props;
    const { code_error, shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to='/' />;

    return (
      <div>
        <div className='pb-4 sm:pb-10 mb-4 border-b border-gray-200 border-solid -mx-4 sm:-mx-10'>
          <h1 className='text-center font-bold text-2xl'>
            <FormattedMessage id='login.otp_log_in' defaultMessage='OTP Login' />
          </h1>
        </div>

        <div className='sm:pt-10 sm:w-2/3 md:w-1/2 mx-auto'>
          <Form onSubmit={this.handleSubmit} disabled={this.state.isLoading}>
            <FormGroup
              labelText={intl.formatMessage(messages.otpCodeLabel)}
              hintText={intl.formatMessage(messages.otpCodeHint)}
              errors={code_error ? [intl.formatMessage({ id: 'login.otp_log_in.fail', defaultMessage: 'Invalid code, please try again.' })] : []}
            >
              <Input
                name='code'
                type='text'
                autoComplete='off'
                onChange={this.onInputChange}
                autoFocus
                required
              />
            </FormGroup>

            <FormActions>
              <Button
                theme='primary'
                type='submit'
                disabled={this.state.isLoading}
              >
                <FormattedMessage id='login.sign_in' defaultMessage='Sign in' />
              </Button>
            </FormActions>
          </Form>
        </div>
      </div>
    );
  }

}
