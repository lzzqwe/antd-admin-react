import React, { Component } from 'react';

import PropTypes from 'prop-types';

import menuList from '../../config/menu'

import { Form, Input, Tree } from 'antd';

// import {reqUpdateRole} from '../../api'

const { TreeNode } = Tree;

class AuthForm extends Component {

  static propTypes = {
    role: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }
  getMenus = () => this.state.checkedKeys
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )

      return pre
    }, [])
  }

  // state = {
  //   checkedKeys:this.props.
  // }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    this.setState({ checkedKeys });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 }
    }
    return (
      <div>
        <Form.Item {...formItemLayout} label='角色名称'>
          <Input disabled value={this.props.role.name} />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {/* <TreeNode title="parent 1-0" key="0-0-0">
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
            </TreeNode> */}
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}
export default AuthForm;