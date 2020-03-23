import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menu'
import memoryUtils from '../../config/memoryUtils'
import {formateTime} from '../../config/formateTime'
import storage from '../../config/storage'
import { Layout,Modal } from 'antd';
import {reqWeather} from '../../api'
import { HeadTop, HeadBottom } from './style'
const { Header } = Layout;
class AdminHeader extends Component {
  state = {
    dayPictureUrl:'',
    weather:'',
    temperature:'',
    currentTime:formateTime(Date.now())
  }
  getWeather = async (city) => {
     const {dayPictureUrl, weather,temperature} = await reqWeather(city)
     this.setState({
      dayPictureUrl, weather,temperature
     })
  }
  componentDidMount() {
    this.getTime()
    this.getWeather('北京')
  }
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }
  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateTime(Date.now())
      this.setState({
        currentTime
      })
    },1000)
  }
  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        // 在item.children 这个数组中寻找合适的 item
        //indexOf() 方法返回调用它的 String 对象中第一次出现的指定值的索引
        //find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  logOut = () => {
    Modal.confirm({
      content:'确定退出吗?',
      onOk:() => {
        storage.deleteUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    })
  }
  render() {
    const {dayPictureUrl, weather,currentTime,temperature} = this.state
    return (
      <Header style={{ backgroundColor: '#ffff', height: 80, lineHeight: 80, padding: 0 }}>
        <HeadTop>
          <span
          className='welcome'>欢迎,{memoryUtils.user?memoryUtils.user.username:''}</span>
          <span 
          className='logout'
          onClick={this.logOut}
          >退出</span>
        </HeadTop>
        <HeadBottom>
          <div className="head-bottom-left">
            {this.getTitle()}
          </div>
          <div className="head-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="" />
            <span style={{marginRight:5}}>{temperature}</span>
            <span>{weather}</span>
          </div>
        </HeadBottom>
      </Header>
    );
  }
}
export default withRouter(AdminHeader)