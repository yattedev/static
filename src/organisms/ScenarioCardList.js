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
    const rawData = await fetch(this.props.url);
    const data = await rawData.json();
    this.setState({
      items:data,
      loaded:true
    })
  }
  async componentDidUpdate(){
    //http://localhost:3001/scenario
    const rawData = await fetch(this.props.url);
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
        {this.state.items.map(item=><ScenarioCard title={item.title} date={item.date} path={item.path} user={item.user}/>)}
      </div>
      : <div> now loading ... </div>
    )
  }
}
export default ScenarioCardList;
