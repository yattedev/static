import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'

import Home from './pages/Home'
import User from './pages/User'
import Scenario from './pages/Scenario'
import Playlog from './pages/Playlog'
//import Login from './pages/Login'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Logout from './pages/Logout'

const login = !(!localStorage.getItem('loginData'))

class App extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path='/' render={() => <Home login={login} />}/>
          <Route path="/home" render={() => <Home login={login} />} />
          <Route path="/user" render={() => <User login={login} />} />
          <Route path='/scenario' render={() => <Scenario login={login} />} />
          <Route path='/playlog' render={() => <Playlog login={login} />} />
          <Route path='/signin' render={() => <Signin login={login} />} />
          <Route path='/signup' render={() => <Signup login={login} />} />
          <Route path='/logout' render={() => <Logout login={login} />} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
