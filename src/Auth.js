import React from 'react';

const login = !(!localStorage.getItem('loginData'))

class Auth extends React.Component{
  render() {
    return (
      <Route children={this.props.children} login={login}/>
    )
  }
}

export default Auth;
