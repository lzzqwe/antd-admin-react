import React, { Component } from 'react';

import { Card, Table, Divider, Modal, Button, Icon, message } from 'antd';

import AddForm from './add-form'

import UpdateForm from './update-form'

import LinkButton from '../../components/link-button'

import { getCategory, addCategory, updateCategory } from '../../api/index'

class Category extends Component {

  state = {
    CateGorys: [],
    subCateGorys: [],
    columns: [],
    showStatus: 0,
    parentId: '0',
    parentName: '',
    loading: false
  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => { this.updateModal(category) }}>修改分类</LinkButton>
            <Divider type="vertical" />
            {this.state.parentId === '0' ? <LinkButton onClick={() => {
              this.showSubCategorys(category)
            }}>查看子分类</LinkButton> : null}
          </span>
        ),
      },
    ];
  }
  componentDidMount() {
    this.initColumns()
    this._getCategory(this.state.parentId)
  }
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      // console.log('parentId' + this.state.parentId)
      // 获取二级分类列表显示
      this._getCategory()
    })
  }
  _getCategory = async (parentId) => {
    //在发请求前开启loading加载
    this.setState({
      loading: true
    })
    parentId = parentId || this.state.parentId
    const { status, data } = await getCategory(parentId)
    this.setState({
      loading: false
    })
    if (status === 0) {
      // 获取一级分类
      if (parentId === '0') {
        this.setState({
          CateGorys: data
        })
      } else {  // 获取二级分类
        this.setState({
          subCateGorys: data
        })
      }
    } else {
      message.error('获取分类列表失败')
    }
  }
  updateModal = (category) => {
    // 保存对象
    this.category = category
    this.setState({
      showStatus: 1,
    });
  };

  _addCategory = e => {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        this.setState({
          showStatus: 0,
        });
        const { parentId, categoryName } = value
        // 重置一组输入控件的值
        this.form.resetFields()
        const result = await addCategory(parentId, categoryName)
        if (result.status === 0) {
          // 添加的分类就是当前分类列表下的分类
          if (parentId === this.state.parentId) {
            // 重新获取当前分类列表显示
            this._getCategory()
          } else if (parentId === '0') { // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
            this._getCategory('0')
          }
        }
      }
    })
  }

  _updateCategory = e => {
    this.form.validateFields(async (err, value) => {
      if (!err) {
        this.setState({
          showStatus: 0,
        })
        //获取数据
        // const {parentId} = this.category
        const categoryId = this.category._id
        const { categoryName } = value
        this.form.resetFields()
        const { status } = await updateCategory(categoryId, categoryName)
        if (status === 0) {
          this._getCategory()
        }

      }
    })
  }

  handleCancel = e => {
    this.setState({
      showStatus: 0,
    });
  };
  addShow = () => {
    this.setState({
      showStatus: 2
    })
  }
  showCategorys = () => {
    // 更新为显示一列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }
  render() {
    const { showStatus, parentName, CateGorys, parentId, subCateGorys, loading } = this.state
    const extra = (
      <Button onClick={this.addShow} type="primary">
        <Icon type="plus" />添加
      </Button>
    )

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    )


    return (
      <div>
        <Card
          title={title}
          extra={extra}
          style={{ width: '100%' }}>
          <Table
            rowKey='_id'
            columns={this.columns}
            dataSource={parentId === '0' ? CateGorys : subCateGorys}
            pagination={{ defaultPageSize: 8, showQuickJumper: true }}
            bordered
            loading={loading}
          />
          <Modal
            title="更新分类"
            visible={showStatus === 1}
            onOk={this._updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm
              categoryName={this.category}
              setForm={(form) => { this.form = form }}
            ></UpdateForm>
          </Modal>
          <Modal
            title="添加分类"
            visible={showStatus === 2}
            onOk={this._addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm
              categories={CateGorys}
              parentId={parentId}
              setForm={(form) => { this.form = form }}
            ></AddForm>
          </Modal>
        </Card>
      </div>
    );
  }
}
export default Category;
