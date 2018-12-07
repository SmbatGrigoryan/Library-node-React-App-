import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getUsers, registerUser, clearRegisterUser} from '../Actions/index';
import Scroll from 'react-scroll';
import {Link} from 'react-router-dom';

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faUser, faBook} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faBook);


const Element = Scroll.Element;
const scroller = Scroll.scroller;

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.handleInputEmail = this.handleInputEmail.bind(this);
    this.handleInputPassword = this.handleInputPassword.bind(this);
    this.handleInputFirstName = this.handleInputFirstName.bind(this);
    this.handleInputLastName = this.handleInputLastName.bind(this);
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      error: '',
      emailErr: '',
      firstNameErr: '',
      lastNameErr: '',
      passwordErr: '',
      addUserButton: '',
      movedToHash: false

    }
  }

  componentWillMount() {
    this.props.dispatch(getUsers())
  }

  componentWillUpdate(nextProps) {
    if (nextProps.registerUserSuccess) {
      this.setState(() => {
        return {
          addUserButton: 'addUserButton'
        }
      });
      scroller.scrollTo('myScrollToElement', {
        duration: 1500,
        delay: 100,
        smooth: true
      })
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.registerUserSuccess === false) {
      this.setState(() => ({error: 'Error, try again'}))
    } else {
      this.setState(() => {
        return {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: ''
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearRegisterUser())
  }

  handleInputEmail(e) {
    let email = e.target.value;
    this.setState(() => {
      return {email}
    });
  }

  handleInputPassword(e) {
    let password = e.target.value;

    if (!(password.length < 6)) {
      this.setState(() => {
        return {passwordErr: ''}
      });
    }

    this.setState(() => {
      return {password}
    });
  }

  handleInputFirstName(e) {
    let firstName = e.target.value;

    if (firstName.length >= 3 && firstName.length < 80) {
      this.setState(() => {
        return {firstNameErr: ''}
      });
    }

    this.setState(() => {
      return {firstName}
    });
  }

  handleInputLastName(e) {
    let lastName = e.target.value;

    if (lastName.length >= 3 && lastName.length < 80) {
      this.setState(() => {
        return {lastNameErr: ''}
      });
    }

    this.setState(() => {
      return {lastName}
    });
  }

  submitForm(e) {
    e.preventDefault();
    const {email, password, firstName, lastName} = this.state;

    if (password.length < 6 || firstName.length < 3 || firstName.length > 80 || lastName.length < 3 || lastName.length > 80) {
      if (password.length < 6) {
        this.setState(() => {
          return {passwordErr: 'password should contain at least 6 characters'}
        });
      }
      if (firstName.length < 3 || firstName.length > 80) {
        this.setState(() => {
          return {firstNameErr: 'first name should contain at least 3 but no more than 80 characters'}
        });
      }
      if (lastName.length < 3 || lastName.length > 80) {
        this.setState(() => {
          return {lastNameErr: 'last name should contain at least 3 but no more than 80 characters'}
        });
      }
      return;
    }

    this.props.dispatch(registerUser(
        {
          email,
          password,
          firstName,
          lastName
        },
        this.props.allUsers
        )
    );
  }

  showUsers() {
    let users = this.props.allUsers;
    return (
        users ?
            users.map(item => {
              return (
                  <tr key={item._id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                  </tr>
              )
            })
            : null
    )
  };

  showLinks() {
    const items = [
      {
        type: 'navItem',
        icon: 'home',
        text: 'Home',
        link: '/'
      },
      {
        type: 'navItem',
        icon: 'user',
        text: 'My Profile',
        link: '/user',
      },
      {
        type: 'navItem',
        icon: 'book',
        text: 'Add Book',
        link: '/user/add'
      }
    ];

    return items.map((item, i) => {
      return (
          <Link to={item.link} key={i}>
            <FontAwesomeIcon icon={item.icon}/>
            <span>{item.text}</span>
          </Link>
      )
    })
  }

  render() {
    return (
        <div className="rl_container">
          <form onSubmit={this.submitForm}>
            <h2>Add user</h2>

            <div className="form_element">
              <input
                  type="text"
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  onChange={this.handleInputFirstName}
              />
            </div>
            {
              this.state.firstNameErr ? (
                  <div className="error">{this.state.firstNameErr}</div>
              ) : null
            }

            <div className="form_element">
              <input
                  type="text"
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  onChange={this.handleInputLastName}
              />
            </div>
            {
              this.state.lastNameErr ? (
                  <div className="error">{this.state.lastNameErr}</div>
              ) : null
            }

            <div className="form_element">
              <input
                  type="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.handleInputEmail}
              />
            </div>

            <div className="form_element">
              <input
                  type="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleInputPassword}
              />
            </div>
            {
              this.state.passwordErr ? (
                  <div className="error">{this.state.passwordErr}</div>
              ) : null
            }
            <button type="submit" className={this.state.addUserButton}>Add user</button>
            <div className="error">
              {this.state.error}
            </div>
          </form>

          <Element name="myScrollToElement">

            {this.props.registerUserSuccess && (
                <div className="after_registration">
                  {this.showLinks()}
                </div>
            )}
          </Element>

          <div className="current_users" id="current_users">
            <h4>List of Current users:</h4>
            <table>
              <thead>
              <tr>
                <th>Fires Name</th>
                <th>Last Lame</th>
                <th>Email</th>
              </tr>
              </thead>
              <tbody>
              {this.showUsers()}
              </tbody>
            </table>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allUsers: state.user.allUsers,
    registerUserSuccess: state.user.registerUserSuccess
  };
}

export default connect(mapStateToProps)(Register);
