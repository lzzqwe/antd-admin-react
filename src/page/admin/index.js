import React from 'react';
import {Switch,Route, Redirect} from 'react-router-dom'
import { Layout} from 'antd';
import memoryUtils from '../../config/memoryUtils'
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
    const user = memoryUtils.user
    console.log(user)
    if(!user || !user._id) {
       return <Redirect to='/login'/>
    }
    return (
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout style={{ height: '100%' }}>
          <Header></Header>
          <Content style={{ margin: 20, backgroundColor: 'rgb(255, 255, 255)'}}>
            <Switch>
              <Redirect from='/' exact to='/home'></Redirect>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/charts/bar' component={Bar}></Route>
              <Route path='/charts/line' component={Line}></Route>
              <Route path='/charts/pie' component={Pie}></Route>
              <Route path='/order' component={Order}></Route>
              <Route component={NotFound}></Route>
            </Switch>
          </Content>
          <Footer style={{textAlign:"center",fontWeight:600}}>备案号：陇ICP备19002965号</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin