import React, { Component } from 'react';
import { auth } from '../Actions/index';
import {connect} from 'react-redux';


export default (ComposedClass) => {

  class AuthCheck extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true
      }
    }

    componentWillMount(nextProp) {
      this.props.dispatch(auth())
    }

    componentWillReceiveProps(nextProps) {
      this.setState(() => {
        return { loading: false }
      });

      if( ! nextProps.user.userIsAuthenticated ) {
              if (this.props.history.location.pathname !== '/login') {
                this.props.history.push('/login');
              }
            } else if (nextProps.user.userIsAuthenticated){
              if (this.props.history.location.pathname !== this.props.match.url) {
                this.props.history.push(this.props.match.url);
              }
            }
    }

    render() {
      console.log(`AuthCheck this.props-------`, this.props)

      if (this.state.loading) {
        return (
            <div className="loader">
              Loading ... ...
            </div>
        )
      }
      return (
          <ComposedClass {... this.props }  user={this.props.user.authLogin}/>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
      STATE: state

    };
  }

  return connect( mapStateToProps )(AuthCheck)
}


