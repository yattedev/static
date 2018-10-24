import React, { Component } from 'react';
const Login = () => (
  <div className="login-form">
    <form>
      <div>
        <label for="email">email</label>
        <input type="text" id="email" name="email"/>
      </div>
      <div>
        <label for="pass">pass</label>
        <input type="pass" id="pass" name="pass"/>
      </div>
      <input type='submit' value='ログイン'/>
    </form>
  </div>
);

export default Login;
