import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
const { Option } = Select;
class UserForm extends Component {
  state = {}
  static protoTypes = {
    roles: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  // handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }
    const { roles, user } = this.props
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label='用户名'>
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [{ message: '请输入用户名' }],
          })(
            <Input
              placeholder="Username"
            />,
          )}
        </Form.Item>
        {user._id ? null : (<Form.Item label='密码'>
          {getFieldDecorator('password', {
            initialValue: user.password,
            rules: [{ message: '请输入密码' }],
          })(
            <Input
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>)}
        <Form.Item label='手机号'>
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [{ message: '请输入手机号码' }],
          })(
            <Input
              placeholder="请输入手机号码"
            />,
          )}
        </Form.Item>
        <Form.Item label='邮箱'>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{ message: '请输入电子邮箱' }],
          })(
            <Input
              placeholder="请输入电子邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item label='角色'>
          {getFieldDecorator('role_id', {
            initialValue: user.role_id
          }
          )(
            <Select>
              {
                roles.map(role => {
                  return <Option key={role._id} value={role._id}>{role.name}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);