import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './pages/Home'
import User from './pages/User'
import Scenario from './pages/Scenario'
import Playlog from './pages/Playlog'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to='/'>ホーム</Link></li>
        <li><Link to='/user'>ユーザー</Link></li>
        <li><Link to='/scenario'>シナリオ</Link></li>
        <li><Link to='/playlog'>プレイログ</Link></li>
        <li><Link to='/login'>ログイン</Link></li>
        <li><Link to='/signup'>サインアップ</Link></li>
      </ul>

      <div>
        <Route exact path='/' component={Home}/>
        <Route path='/user' component={User} />
        <Route path='/scenario' component={Scenario} />
        <Route path='/playlog' component={Playlog} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
      </div>
    </div>
  </BrowserRouter>
)

export default App;
