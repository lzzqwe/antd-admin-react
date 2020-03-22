import React from 'react';

import PropTypes from 'prop-types';

import { Form,Input } from 'antd';

class UpdateForm extends React.Component {


  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName: PropTypes.object.isRequired
  }
  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    // getFieldDecorator 用于和表单进行双向绑定，详见下方描述
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props
    return (
      <Form layout='horizontal'>
        <Form.Item>
          {getFieldDecorator('categoryName', {
            initialValue:categoryName.name
          })(
            <Input placeholder='dsdsd'></Input>
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm); 