import React from 'react';

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
