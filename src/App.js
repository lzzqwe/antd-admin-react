import React from 'react';

import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Admin from './page/admin/index'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            <Admin></Admin>
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
