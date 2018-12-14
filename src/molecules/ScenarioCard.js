import React, { Component } from 'react';

//{タイトル,サムネイル,シナリオパス,登録日時,投稿者}

class ScenarioCard extends Component{
  render(){
    return(
      <div className="scenario-card">
        <div className="title">
          title : {this.props.item.title}
        </div>
        <div className="user_name">
          name : {this.props.item.user_name}
        </div>
        <div className="path">
          file_path : {this.props.item.file_path}
        </div>
        <div className="user">
          test : {JSON.stringify(this.props.item)}
        </div>
        <br/>
      </div>
    )
  }
}


export default ScenarioCard;
