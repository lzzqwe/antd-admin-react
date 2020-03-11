import React from 'react';

import {Switch,Route, Redirect} from 'react-router-dom'

import { Layout} from 'antd';

import Home from '../../page/home'
import Category from '../../page/category'
import Product from '../../page/product'
import User from '../../page/user'
import Role from '../../page/role'
import Bar from '../../page/charts/bar'
import Line from '../../page/charts/line'
import Pie from '../../page/charts/pie'
import NotFound from '../../page/not-found'
import Order from '../../page/order'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

const { Footer, Sider, Content } = Layout;

class Admin extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout style={{ height: '100%' }}>
          <Header></Header>
          <Content style={{ margin: 20, backgroundColor: 'rgb(255, 255, 255)',height: '100%' }}>
            <Switch>
              <Redirect from='/' exact to='/home'></Redirect>
              <Route exact path='/home' component={Home}></Route>
              <Route exact path='/category' component={Category}></Route>
              <Route exact path='/product' component={Product}></Route>
              <Route exact path='/user' component={User}></Route>
              <Route exact path='/role' component={Role}></Route>
              <Route exact path='/charts/bar' component={Bar}></Route>
              <Route exact path='/charts/line' component={Line}></Route>
              <Route exact path='/charts/pie' component={Pie}></Route>
              <Route exact path='/order' component={Order}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
          <Footer style={{textAlign:"center"}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin