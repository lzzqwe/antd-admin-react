import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Login from './page/login/index'

import Admin from './page/admin/index'

class App extends React.Component {
  render() {
    return ( //换个位置即可成
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/'>
            <Admin></Admin>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
