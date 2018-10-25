import React, { Component } from 'react';

class Signup extends React.Component{

  constructor(){
    super();
    this.state = {
      email:"",
      pass:""
    }
  }

  emailUpdate (e) {
    this.setState({email: e.target.value})
  }
  passUpdate (e) {
    this.setState({pass: e.target.value})
  }
  submit (e) {
    this.setState({
      test:email + pass
    })

    e.preventDefault()
  }
  render(){
    return(
      <div className='Signup-form'>
        <form>
          <label for='email'>email</label>
          <input type='text' value={this.state.email} onChange={e => this.emailUpdate(e)} />
          <label for='pass'>pass</label>
          <input type='pass' value={this.state.pass} onChange={e => this.passUpdate(e)} />
        </form>
      </div>
    )
  }
}

export default Signup;
