import React, { Component } from 'react';

class Signup extends React.Component{
  logout (){
    localStorage.removeItem("loginData");
    window.location.href = "http://localhost:3000/signin";
  }

  render (){
    return(
      <div className='Signup-form'>
        <p>ログアウトする</p>
        <button onClick={this.logout}>ログアウト</button>
      </div>
    )
  }
}

export default Signup;
