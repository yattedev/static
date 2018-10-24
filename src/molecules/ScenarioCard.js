import React, { Component } from 'react';

//{タイトル,サムネイル,シナリオパス,登録日時,投稿者}

class ScenarioCard extends Component{
  render(){
    return(
      <div className="scenario-card">
        <div className="title">
          {this.props.title}
        </div>
        <div className="date">
          {this.props.date}
        </div>
        <div className="path">
          {this.props.path}
        </div>
        <div className="user">
          {this.props.user}
        </div>
      </div>
    )
  }
}


export default ScenarioCard;
