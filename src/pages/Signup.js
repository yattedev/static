import React, { Component } from 'react';
const Signup = () => (
<div className="Signup-form">
  <form>
    <div>
      <label for="email">email</label>
      <input type="text" id="email" name="email"/>
    </div>
    <div>
      <label for="pass">pass</label>
      <input type="pass" id="pass" name="pass"/>
    </div>
  </form>
</div>
)

export default Signup;
