import React from 'react';

import Header from '../molecules/Header';
import LoginForm from '../molecules/LoginForm';

class Signin extends React.Component{

  constructor(){
    super();
    this.state = {
      loading : false,
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
      test:this.state.email + this.state.pass,
      loading : true
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
    }).then(function(){
      window.location.href = "http://localhost:3000/home";
    })
    e.preventDefault()
  }

  render(){
    if(!this.state.loading){
      return(
        <div>
          <Header currentUrl='/signin' type={this.props.login}/>

          <LoginForm submitFunc={e => this.submit(e)}
            emailUpdate={e => this.emailUpdate(e)}
            passUpdate={e => this.passUpdate(e)}
            state={{email:this.state.email,pass:this.state.pass}}
          />
        </div>
      )
    }else{
      return(
        <div>Please wait</div>
      )
    }
  }
}

export default Signin;
