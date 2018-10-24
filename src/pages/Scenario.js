import React, { Component } from 'react';
import ScenarioCard from '../molecules/ScenarioCard'


class Scenario extends React.Component{
  constructor(){
    super();
    this.state = {
      loaded:false,
      items:[]
    }
  }
  async componentDidMount(){
    const rawData = await fetch("http://localhost:3001/scenario");
    const data = await rawData.json();
    this.setState({
      items:data,
      loaded:true
    })
    console.log("load")
  }
  render(){
    return (
      this.state.loaded ?
      <div>
      {this.state.items.map(t=><ScenarioCard title={t.title} date={t.date} path={t.path} user={t.user}/>)}
      </div>
      : <div> now loading ... </div>
    )
  }
}
/*
    {te.map((t)=>
      <ScenarioCard title={t.title} date={t.date} path={t.path} user={t.user}/>
    )}
  </div>
)*/
export default Scenario;
