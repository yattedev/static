import React, { Component } from 'react';
import ScenarioCard from '../molecules/ScenarioCard'

class ScenarioCardList extends React.Component{
  constructor(){
    super();
    this.state = {
      loaded:false,
      items:[]
    }
  }
  async componentDidMount () {
    //http://localhost:3001/scenario
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const rawData = await fetch(this.props.url,{
      method: 'GET', // or 'PUT'
      headers:{
        'access-token':loginData['access-token'],
        'expiry':loginData['expiry'],
        'token-type':loginData['token-type'],
        'uid':loginData['uid'],
        'client':loginData['client']
      }});
    const data = await rawData.json();
    this.setState({
      items:data,
      loaded:true
    })
  }
  async componentDidUpdate(){
    //http://localhost:3001/scenario
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    const rawData = await fetch(this.props.url,{
      method: 'GET', // or 'PUT'
      headers:{
        'access-token':loginData['access-token'],
        'expiry':loginData['expiry'],
        'token-type':loginData['token-type'],
        'uid':loginData['uid'],
        'client':loginData['client']
      }}
    );
    const data = await rawData.json();
    this.setState({
      items:data,
      loaded:rawData.ok
    })
  }
  render(){
    return (
      this.state.loaded ?
      <div>
        {this.state.items.map(item=><ScenarioCard item={item}/>)}
      </div>
      : <div> now loading ... </div>
    )
  }
}
export default ScenarioCardList;
