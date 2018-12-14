import React, { Component } from 'react';

class Signin extends React.Component{

  constructor(){
    super();
    this.state = {
      email:"",
      pass:"",
      test:"",
      url:"https://wadawada.herokuapp.com/auth/sign_in"
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
    .then(res => {
      switch (res.status) {
        case 401:
          this.setState({test:res.status})
          res.json()
          .then(function(json){
            console.log(json.errors)
          })
          break;

        default:
          const json = {
            'access-token':res.headers.get('access-token'),
            'expiry':res.headers.get('expiry'),
            'token-type':res.headers.get('token-type'),
            'uid':res.headers.get('uid'),
            'client':res.headers.get('client')
          }
          localStorage.setItem('loginData',JSON.stringify(json));
      }
    })
    e.preventDefault()
  }

  render(){
    return(
      <div className='Signup-form'>
      {this.state.test}
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

export default Signin;
