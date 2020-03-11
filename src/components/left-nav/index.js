import React from 'react';

import { Link } from 'react-router-dom'

import menuList from '../../config/menu'

import { Menu, Icon } from 'antd';

import { LeftNavWrapper } from './style'

const { SubMenu } = Menu;

class LeftNav extends React.Component {


  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
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
      return pre
    }, [])
  }
  render() {
    return (
      <LeftNavWrapper>
        <div className='left-nav-header'>
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3663663312,3397280610&fm=26&gp=0.jpg" alt="" />
          <h1>后台</h1>
        </div>
        <div style={{ width: '100%' }}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
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
export default LeftNav