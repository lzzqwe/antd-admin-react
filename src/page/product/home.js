import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Card, Select, Input, Button, Icon, Table, Divider,message } from 'antd';
import LinkButton from '../../components/link-button/index'

import { reqProducts,reqUpdateStatus,reqSearchProducts } from '../../api'
const { Option } = Select

const PAGESIZE = 5
class ProductHome extends Component {
  state = {
    searchType: 'productName',
    products: [],
    total: 0,
    loading:false,
    searchName:''
  }
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    const {searchName,searchType} = this.state
    this.setState({
      loading:true
    })
    let result
    if(searchName) {
      result = await reqSearchProducts({pageNum, pageSize:PAGESIZE,searchName,searchType})
    } else {
      result = await reqProducts(pageNum, PAGESIZE)
    }
    // const { status, data } = await reqProducts(pageNum, PAGESIZE)
    this.setState({
      loading:false
    })
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }
  componentDidMount() {
    this.getProducts(1)
  }
  updateStatus = async (productId,newStatus) => {
    const result = await reqUpdateStatus(productId,newStatus)
    if(result.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }
  UNSAFE_componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 100
      },
      {
        title: '状态',
        key: 'status',
        width: 100,
        render: (product) => {
          const {status,_id} = product
          const newStatus = status ===1 ? 2:1
          return (
            <span>
              <Button onClick={() => {this.updateStatus(_id,newStatus)}} type="primary">
                {status===1?'下架':'上架'}
              </Button>
            <span>{status===1?'在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (text, record) => {
          return (
            <span>
              <LinkButton
                onClick={() => { this.props.history.push('/product/detail',{record}) }}
                style={{ margin: '5px 0' }}>详情</LinkButton>
              <Divider type="vertical" />
              <LinkButton
                onClick={() => {this.props.history.push('/product/addupdate',record)}}
              >修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  render() {
    const { searchType, products, total,loading } = this.state
    const title = (
      <span>
        <Select
          defaultValue={searchType}
          style={{ width: 150 }}
          onChange={(value) => { this.setState({ searchType: value }) }}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 150, margin: '0 15px' }}
          onChange={(event) => {this.setState({searchName:event.target.value})}}
          placeholder="关键字" />
        <Button onClick={() => this.getProducts(1)} type="primary">搜索</Button>
      </span>
    )
    const extra = (
      <Button
        onClick={() => { this.props.history.push('/product/addupdate') }}
        type="primary">
        <Icon type="plus" />添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          loading={loading}
          bordered
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            defaultPageSize: PAGESIZE,
            showQuickJumper: true,
            onChange: this.getProducts,
            total
          }}
        />;
      </Card>
    );
  }
}

export default withRouter(ProductHome);