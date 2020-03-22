import React, { Component } from 'react';

import { Card, Table, Divider, Button, Modal, message } from 'antd';

import LinkButton from '../../components/link-button'

import UserForm from './user-form'

import { reqAllUsers, reqAddUser, reqUpdateUser, reqDeleteUser } from '../../api'

class User extends Component {
  state = {
    visible: false,
    users: [],
    roles: []
  }
  componentWillMount() {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time'
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => {
          return this.roleNames[role_id]
        }
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <Divider type="vertical" />
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        ),
      },
    ];
  }
  componentDidMount() {
    this.getAllUsers()
  }
  deleteUser = async (user) => {
    Modal.confirm({
      content: `确定要删除${user.username}吗?`,
      onOk:async () => {
        const res = await reqDeleteUser(user._id)
        if (res.status === 0) {
          message.success('删除用户成功')
          this.getAllUsers()
        }
      }
    })
  }
  getAllUsers = async () => {
    const { status, data } = await reqAllUsers()
    if (status === 0) {
      const { users, roles } = data
      this.initRoleNames(roles)
      this.setState({
        users, roles
      })
    }
  }
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((acc, cur) => {
      acc[cur._id] = cur.name
      return acc
    }, {})
    this.roleNames = roleNames
  }

  showUpdate = (user) => {
    console.log(user)
    this.user = user
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({
          visible: false,
        });
        this.form.resetFields()
        let res
        if (this.user) {
          values._id = this.user._id
          res = await reqUpdateUser(values)
        } else {
          res = await reqAddUser(values)
        }
        if (res.status === 0) {
          message.success(`${this.user ? '修改' : '添加'}用户成功`)
          this.getAllUsers()
        }
      }
    });
  };

  handleCancel = e => {
    // console.log(e);
    this.setState({
      visible: false,
    });
  }
  showAddModal = () => {
    this.user = null
    this.setState({
      visible: true
    })
  }
  render() {
    const { users, roles } = this.state
    const user = this.user || {}
    const title = (
      <Button onClick={this.showAddModal} type='primary'>创建用户</Button>
    )
    return (
      <div>
        <Card title={title} style={{ width: '100%' }}>
          <Table
            rowKey="_id"
            columns={this.columns}
            dataSource={users}
            pagination={{ defaultPageSize: 6, showQuickJumper: true }}
            bordered
          />
        </Card>
        <Modal
          title={user._id?'修改用户':'添加用户'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <UserForm
            roles={roles}
            user={user}
            setForm={(form) => { this.form = form }}
          ></UserForm>
        </Modal>
      </div>
    );
  }
}
export default User;
