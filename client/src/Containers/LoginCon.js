import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '.././Actions/index';

class LoginCon extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);

    this.state = {
      email: '',
      password: '',
      success: false,
      error: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.login && nextProps.user.login.isAuth) {
      this.props.history.push('/user')
    }
  }

  handleInputEmail(e) {
    let email = e.target.value;
    this.setState(() => {
      return {
        email
      }
    })
  }

  handleInputPassword(e) {
    let password = e.target.value;
    this.setState(() => {
      return {
        password
      }
    })
  }

  submitForm(e) {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state.email, this.state.password))
  }


  render() {
    return (
        <div className="rl_container">
          <form onSubmit={this.submitForm}>
            <h2>Log in</h2>

            <div className="form_element">
              <input
                  type="email"
                  placeholder="Enter your mail"
                  value={this.state.email}
                  onChange={this.handleInputEmail}
              />
            </div>

            <div className="form_element">
              <input
                  type="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleInputPassword}
              />
            </div>

            <button type="submit">Log in</button>

            <div className="error">
              {
                this.props.user.login ? (
                    <div>{this.props.user.login.message}</div>
                ) : null
              }
            </div>
          </form>
          LoginContainer
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(LoginCon);

