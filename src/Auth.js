import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom';

class Auth extends React.Component{

  componentWillMount() {
    this.userWillTransfer(this.props);
  }

  componentWillUpdate() {
    if (!localStorage.getItem('loginData')) {
      this.userWillTransfer(this.props);
    }
  }

  userWillTransfer() {
    if (!localStorage.getItem('loginData')) {
      this.setState({ login: false });
    } else {
      this.setState({ login: true });
    }
  }

  render() {
    return (
      this.state.login? (
        <Route children={this.props.children} />
      ) : (
        <Redirect to={'/login'} />
      )
    )
  }
}

export default Auth;
