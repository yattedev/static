import React, { Component } from 'react';

class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      items:''
    }
  }

  async componentDidMount () {
    this.setState({
      items:localStorage.getItem('loginData')
    })
  }

  render(){
    return(
      <div className='Home'>
        {this.state.items}
      </div>
    )
  }
}

export default Home;
