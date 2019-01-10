import React from 'react';
import ScenarioArea from '../organisms/ScenarioArea'
import Header from '../molecules/Header'

class Scenario extends React.Component{
  render(){
    return (
      <div>
        <Header currentUrl='/scenario' type={this.props.login}/>
        <ScenarioArea/>
      </div>
    )
  }
}

export default Scenario;
