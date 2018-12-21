import React, { Component } from 'react';

import Header from '../molecules/Header';

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
      <div>
        <Header currentUrl='/' type={this.props.login}/>
        <div className='Home'>
          {this.state.items}
        </div>
      </div>
    )
  }
}

export default Home;
