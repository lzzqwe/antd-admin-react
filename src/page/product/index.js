import React, { Component } from 'react';

import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './home'

import ProductDetail from './detail'

import AddUpdate from './add-update'

class Product extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/product' component={ProductHome}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Route path='/product/addUpdate' component={AddUpdate}></Route>
        <Redirect to='/product'/>
      </Switch>
    );
  }
}
export default Product;
