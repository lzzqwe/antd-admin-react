import React, { Component } from 'react';
import { Layout} from 'antd';
import {HeadTop,HeadBottom} from './style'
const { Header} = Layout;
class AdminHeader extends Component {
  state = {  }
  render() { 
    return ( 
      <Header style={{ backgroundColor: '#ffff',height:80,lineHeight:80,padding:0 }}>
        <HeadTop>
          <span className='welcome'>欢迎,admin</span><span className='logout'>退出</span>
        </HeadTop>
        <HeadBottom>
          <div className="head-bottom-left">
            首页
          </div>
          <div className="head-bottom-right">
            <span>2020-3-9 19:12:30</span>
            <img src="http://api.map.baidu.com/images/weather/day/wu.png" alt=""/>
            <span>雾转小雨</span>
          </div>
        </HeadBottom>
      </Header>
     );
  }
}
export default AdminHeader;