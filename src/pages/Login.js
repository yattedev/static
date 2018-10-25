import React, { Component } from 'react';

class Login extends React.Component{

  constructor(){
    super();
    this.state = {
      email:"",
      pass:"",
      test:"",
      url:"http://localhost:3000/login"
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
        'Content-Type':'applicatuib/json'
      }),
      method: 'POST',
      body: JSON.stringify({'email':this.state.email,'pass':this.state.pass})
    })
    .catch((e) => {
      throw Error(e);
    })
    .then(res => {
      if(res.status != 404){
        res.json()
        .then(json => {
          console.log(json)
          localStorage.setItem('json',json());
        })
      }
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
            <input type='pass' value={this.state.pass} onChange={e => this.passUpdate(e)} />
          </div>
          <input type='submit' value='send'/>
        </form>
        {this.state.test}
      </div>
    )
  }
}

export default Login;
