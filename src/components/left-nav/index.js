import React from 'react';

import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menu'

import memoryUtils from '../../config/memoryUtils'

import { Menu, Icon } from 'antd';

import { LeftNavWrapper } from './style'

const { SubMenu } = Menu;

class LeftNav extends React.Component {

  // {
  // _id: "5e63c9fb63bb513884025164"
  // username: "lzzqwe"
  // password: "e10adc3949ba59abbe56e057f20f883e"
  // phone: "15393597399"
  // email: "352840359@qq.com"
  // role_id: "5e6b53262755b42d5c78119d"
  // create_time: 1583598075378
  // role: {
  //   menus: Array(12)
  //   0: "/home"
  //   1: "/user"
  //   2: "/role"
  //   3: "/charts"
  //   4: "/charts/bar"
  //   5: "/charts/line"
  //   6: "/charts/pie"
  //   7: "/order"
  //   8: "all"
  //   9: "/products"
  //   10: "/category"
  //   11: "/product"
  //   length: 12
  //   __proto__: Array(0)
  //   _id: "5e6b53262755b42d5c78119d"
  //   name: "test"
  //   create_time: 1584091942427
  //   __v: 0
  //   auth_name: "lzzqwe"
  //   auth_time: 1584457683750
  // }
  // }

  // const menuList = [
  //   {
  //     key: '/home',
  //     title: '首页',
  //     icon: 'home',
  //  isPublic:true
  //   },
  //   {
  //     key: '/products',
  //     title: '商品',
  //     icon: 'appstore',
  //     children: [
  //       {
  //         key: '/category',
  //         title: '品类管理',
  //         icon: 'bars'
  //       },
  //       {
  //         key: '/product',
  //         title: '商品管理',
  //         icon: 'tool'
  //       }
  //     ]
  //   },
  //   {
  //     title: '用户管理',
  //     key: '/user',
  //     icon: 'user'
  //   },
  //   {
  //     title: '角色管理',
  //     key: '/role',
  //     icon: 'safety',
  //   },

  //   {
  //     title: '图形图表',
  //     key: '/charts',
  //     icon: 'area-chart',
  //     children: [
  //       {
  //         title: '柱形图',
  //         key: '/charts/bar',
  //         icon: 'bar-chart'
  //       },
  //       {
  //         title: '折线图',
  //         key: '/charts/line',
  //         icon: 'line-chart'
  //       },
  //       {
  //         title: '饼图',
  //         key: '/charts/pie',
  //         icon: 'pie-chart'
  //       },
  //     ]
  //   },

  //   {
  //     title: '订单管理',
  //     key: '/order',
  //     icon: 'windows',
  //   },
  // ]

  hasAuth = (item) => {
    const { key, isPublic } = item
    const menus = memoryUtils.user.role.menus

    const username = memoryUtils.user.username
    /*
    *1 如果username是admin
    2. 如果item 是公开的
    3.当前用户有此item的权限: key有没有menus中
     * 
     */
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if (item.children) {
      return !!item.children.find((cItem) => menus.indexOf(cItem.key) !== -1)
    }
    return false
  }
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {

          // 查找一个与当前请求匹配的item
          const cItem = item.children.find((cItem) => {
            return path.indexOf(cItem.key) === 0
          })
          if (cItem) {
            this.openKey = item.key
          }
          pre.push((
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }
  render() {
    let path = this.props.location.pathname
    console.log(path)
    if (path.indexOf('/product') === 0) { // 当前请求的是商品或其子路由界面
      path = '/product'
    }
    const openKey = this.openKey
    return (
      <LeftNavWrapper>
        <div className='left-nav-header'>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3663663312,3397280610&fm=26&gp=0.jpg" alt="" />
          <h1>电商后台</h1>
        </div>
        <div style={{ width: '100%' }}>
          <Menu
            defaultSelectedKeys={[openKey]}
            selectedKeys={[path]}
            mode="inline"
            theme="dark"
          >
            {this.getMenuNodes(menuList)}
          </Menu>
        </div>
      </LeftNavWrapper>
    )
  }
}
export default withRouter(LeftNav)