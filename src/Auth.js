import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom';

const login = !(!localStorage.getItem('loginData'))

class Auth extends React.Component{
  render() {
    return (
      <Route children={this.props.children} login={login}/>
    )
  }
}

export default Auth;
