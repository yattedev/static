import React, { Component } from 'react';
import ScenarioCardList from '../organisms/ScenarioCardList'

class Scenario extends React.Component{
  constructor(){
    super();
    this.state = {
      url:"http://localhost:3001/scenario"
    }
  }

  update (e) {
    this.setState({value: e.target.value})
  }

  query (value) {
    let undefind
    if(value === undefind){
      value = ""
    }
    let url = value
    url = "http://localhost:3001/scenario/"+url
    return url
  }

  submit (e) {
    this.setState({url: this.query(this.state.value)})
    e.preventDefault()
  }

  render(){
    return (
        <div>
          <form onSubmit={e => this.submit(e)}>
            <input type='text' value={this.state.value} onChange={e => this.update(e)} />
            <input type='submit' value='send'/>
          </form>

          {this.state.url}

          <ScenarioCardList url={this.state.url}/>
        </div>
    )
  }
}
export default Scenario;
