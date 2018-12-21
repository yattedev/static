import React, { Component } from 'react';

class LoginForm extends Component{
  render(){
    return(
      <div className='Signup-form'>
        <form onSubmit={this.props.submitFunc}>
          <div>
            <label>email</label>
            <input type='text' value={this.props.state.email} onChange={this.props.emailUpdate} />
          </div>
          <div>
            <label>pass</label>
            <input type='password' value={this.props.state.pass} onChange={this.props.passUpdate} />
          </div>
          <input type='submit' value='send'/>
        </form>
      </div>
    )
  }
}

export default LoginForm;
