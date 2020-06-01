import React from 'react';
import Header from '../molecules/Header';

class Game extends React.Component{
  render(){
    return (
      <div>
        <Header currentUrl='/' type={this.props.login}/>
        <div id="ApollonRoot"></div>
      </div>
    )
  }
  componentDidMount() {
    const root = document.getElementById('ApollonRoot')
    let e = document.createElement('script')
    e.src = '/game/bundle.js'
    root.appendChild(e)
    e.onload = () => {
      const game = new window.Game(window.Engine, root, {width: 800, height: 600, path: '/game/', startup: 'script/title.as', ui: 'ui/title.ui'})
      game.mainLoop()
    }
  }
}

export default Game;

