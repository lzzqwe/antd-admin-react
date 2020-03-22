import React, { Component } from 'react';

import {withRouter} from 'react-router-dom'

import {reqLogin} from '../../api'

import memoryUtils  from '../../config/memoryUtils'

import storage from '../../config/storage'

import { Form, Icon, Input, Button,message} from 'antd';

import { LoginWrapper, LoginBox,InternetContent } from './style'

class Login extends Component {
  state = {}
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {username,password} = values
        const result = await reqLogin(username,password)
        if(result.status === 0) {
          message.success('登录成功')
          //保存user
          const user = result.data
          //保存在内存中
          memoryUtils.user = user
          // 保存在localStorage中 
          storage.saveUser(user)

          this.props.history.replace('/')

        } else {
          message.error('登录失败')
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginWrapper>
        <LoginBox>
          <h2 className='userLogin'>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名：admin"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码:admin"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </LoginBox>
        <InternetContent style={{textAlign:"center",fontWeight:600}}>备案号：陇ICP备19002965号</InternetContent>
      </LoginWrapper>
    );
  }
}

export default Form.create()(withRouter(Login));