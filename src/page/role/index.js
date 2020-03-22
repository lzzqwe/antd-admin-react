import React, { Component } from 'react';

import { Card, Table, Button, Modal,message } from 'antd';
import { reqRoleList, reqAddRole,reqUpdateRole } from '../../api'

import memoryUtils from '../../config/memoryUtils'

import storage from '../../config/storage'

import {formateTime} from '../../config/formateTime'

import AddForm from './add-form'
import AuthForm from './auth-form'
const PAGESIZE = 8
class Role extends Component {
  constructor(props) {
    super(props);
    this.auth = React.createRef()
    this.state = {
      role: {},
      isShowAdd: false,
      isShowAuth: false,
      roles: [],
      columns:[
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          render:(create_time) => <span>{formateTime(create_time)}</span>  
        },
        {
          title: '授权时间',
          dataIndex: 'auth_time',
          key: 'auth_time',
          render:(auth_time) => <span>{formateTime(auth_time)}</span>
        },
        {
          title: '授权人',
          dataIndex: 'auth_name',
          key: 'auth_name',
        },
      ]
    }
  }
  // constructor(props) {
  //   super(props)
  // }
  getRoleList = async () => {
    const { status, data } = await reqRoleList()
    if (status === 0) {
      console.log(data)
      this.setState({
        roles: data
      })
    }
  }
  componentDidMount() {
    this.getRoleList()
  }
  // componentWillMount() {
  //   this.columns = [
  //     {
  //       title: '角色名称',
  //       dataIndex: 'name',
  //       key: 'name'
  //     },
  //     {
  //       title: '创建时间',
  //       dataIndex: 'create_time',
  //       key: 'create_time',
  //       render:(create_time) => <span>{formateTime(create_time)}</span>  
  //     },
  //     {
  //       title: '授权时间',
  //       dataIndex: 'auth_time',
  //       key: 'auth_time',
  //       render:(auth_time) => <span>{formateTime(auth_time)}</span>
  //     },
  //     {
  //       title: '授权人',
  //       dataIndex: 'auth_name',
  //       key: 'auth_name',
  //     },
  //   ];
  // }
  addRole = ()=> {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          isShowAdd: false,
        });
        console.log('Received values of form: ', values);
        const { roleName } = values
        const res = await reqAddRole(roleName)
        if (res.status === 0) {
          this.getRoleList()
        }
      }
    });
  };
  setRoleAuth = async () => {
    this.setState({
      isShowAuth: false,
    });
    const role = this.state.role
    // // 得到最新的menus
    const menus = this.auth.current.getMenus()

    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username
    const result = await reqUpdateRole(role)
    if(result.status === 0) {
       console.log(memoryUtils.user)
       if(role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {}
        storage.deleteUser()
        this.props.history.replace('/login')
        message.success('当前用户角色权限成功')
       } else {
         this.getRoleList()
        message.success('设置角色权限成功') 
       }
    }
  }

  handleCancel = () => {
    this.setState({
      isShowAdd: false,
    });
  };
  onRow = (role) => {
    return {
      onClick: () => {
        console.log(role)
        this.setState({
          role
        })
      }
    }
  }
  render() {
    const { role, roles, isShowAdd,
      isShowAuth,columns } = this.state
    const title = (
      <span>
        <Button
          onClick={() => { this.setState({ isShowAdd: true }) }}
          type="primary"
        >创建角色</Button>&nbsp;&nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => { this.setState({ isShowAuth: true }) }}
        >
          设置角色权限
        </Button>
      </span>
    )
    return (
      <div>
        <Card title={title} style={{ width: '100%' }}>
          <Table
            rowKey="_id"
            columns={columns}
            dataSource={roles}
            pagination={{
              defaultPageSize: PAGESIZE,
              showQuickJumper: true
            }}
            bordered
            rowSelection={{
              type: 'radio',
              selectedRowKeys: [role._id],
              onSelect: (role) => { // 选择某个radio时回调
                this.setState({
                  role
                })
              }

            }}
            onRow={this.onRow}
          />
          <Modal
            title="添加角色"
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={this.handleCancel}
          >
            <AddForm
              setForm={(form) => this.form = form}
            ></AddForm>
          </Modal>
          <Modal
            title='设置角色权限'
            visible={isShowAuth}
            onOk={this.setRoleAuth}
            onCancel={() => {this.setState({isShowAuth:false})}}
          >
            <AuthForm ref={this.auth} role={role}/>
          </Modal>
        </Card>
      </div>
    );
  }
}
export default Role;
