import React, { Component } from 'react';

class Signup extends React.Component{

  constructor(){
    super();
    this.state = {
      email:"",
      pass:"",
      test:"",
      url:"https://wadawada.herokuapp.com/auth"
      //url:"http://localhost:3000/auth/sign_in"
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
      test:this.state.email + this.state.pass
    })

    fetch(this.state.url, {
      headers: new Headers({
        'Content-Type':'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({'email':this.state.email,'password':this.state.pass})
    })
    .catch((e) => {
      throw Error(e);
    })
    e.preventDefault()
  }

  render(){
    return(
      <div className='Signup-form'>
        <form onSubmit={e => this.submit(e)}>
          <div>
            <label>email</label>
            <input type='text' value={this.state.email} onChange={e => this.emailUpdate(e)} />
          </div>
          <div>
            <label>pass</label>
            <input type='password' value={this.state.pass} onChange={e => this.passUpdate(e)} />
          </div>
          <input type='submit' value='send'/>
        </form>
      </div>
    )
  }
}

export default Signup;
