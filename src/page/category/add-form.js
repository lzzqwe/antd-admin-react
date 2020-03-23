import React from 'react';

import PropTypes from 'prop-types';

import { Form, Select,Input } from 'antd';

const { Option } = Select;

class AddForm extends React.Component {


  static propTypes = {
    setForm: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
  }
  UNSAFE_componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    // getFieldDecorator 用于和表单进行双向绑定
    const { getFieldDecorator } = this.props.form;
    const { parentId, categories } = this.props
    return (
      <Form layout='horizontal'>
        <Form.Item>
          {getFieldDecorator('parentId', {
            initialValue: parentId
          })(
            <Select style={{ width: '100%' }}>
              <Option value='0'>一级分类</Option>
              {categories.map((item) => (
                <Option key={item._id} value={item._id}>{item.name}</Option>
              )
              )}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('categoryName',{
            initialValue:'',
            rules:[{required: true, message: '分类名称必须输入'}]
          })(
            <Input placeholder="请输入分类名称" />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm); 