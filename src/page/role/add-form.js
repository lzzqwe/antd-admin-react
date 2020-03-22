import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Form,Input, } from 'antd';

class AddForm extends Component {

  static propTypes = {
    setForm:PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form {...formItemLayout}>
        <Form.Item label='角色名称'>
          {getFieldDecorator('roleName', {
            rules: [{ message: '请输入角色名称' }],
          })(
            <Input
              placeholder="请输入角色名称"
            />,
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create()(AddForm);