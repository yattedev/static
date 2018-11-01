import React, { Component } from 'react';

class ScenarioCardList extends React.Component{
  constructor(){
    super();
    this.state = {
      loaded:false,
      items:[]
    }
  }
  async componentDidMount () {
    const rawData = await fetch(this.props.url);
    const data = await rawData.json();
    this.setState({
      items:data,
      loaded:true
    })
  }
  render(){
    return (
      this.state.loaded ?
      <div>
        {this.state.data.name}
      </div>
      : <div> now loading ... </div>
    )
  }
}
export default ScenarioCardList;
