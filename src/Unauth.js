import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom';

class Auth extends React.Component{

  render() {
    return (
      localStorage.getItem('loginData')? (
        null
      ) : (
        <Route children={this.props.children} />
      )
    )
  }
}

export default Auth;
