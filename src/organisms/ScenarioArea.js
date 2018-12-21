import React, { Component } from 'react';
import SearchForm from '../molecules/SearchForm';
import ScenarioCardList from '../organisms/ScenarioCardList';

class ScenarioArea extends Component{

  constructor(){
    super();
    const loginData = localStorage.getItem('loginData')
    this.state = {
      url:"https://wadawada.herokuapp.com/scenarios"
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
    url = "https://wadawada.herokuapp.com/scenarios?"+url
    return url
  }

  submit (e) {
    this.setState({url: this.query(this.state.value)})
    e.preventDefault()
  }

  render(){
    return(
      <div>
        <SearchForm
          submitfunc={e => this.submit(e)}
          updatefunc={e => this.update(e)}
          value={this.state.value}
        />
        {this.state.url}
        <ScenarioCardList url={this.state.url}/>
      </div>
    )
  }
}

export default ScenarioArea;
