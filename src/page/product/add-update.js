import React, { Component } from 'react';

import { Card, Form, Input, Button, Cascader, message,Icon } from 'antd';

import LinkButton from '../../components/link-button'

import PicturesWall from './pictures-wall'

import RichTextEditor from './rich-text-editor'

import { reqAddOrUpdate,getCategory } from '../../api'

const { TextArea } = Input;

// const options = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     isLeaf: false,
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     isLeaf: false,
//   },
// ];


class AddUpdate extends Component {
  state = {
    options: []
  }
  constructor(props) {
    super(props)
    this.editor = React.createRef()
    this.pw = React.createRef()
  }
  componentWillMount() {
    const product = this.props.location.state
    // 保存是否更新的标识
    this.isUpdate = !!product // 如果添加则没值 更新则有值
    // 保存商品
    this.product = product || {}
  }
  componentDidMount() {
    this._getCategory('0')
    // console.log(this.props.location.state)
  }
  initOptions = (categories) => {
    const options = categories.map((item) => {
      return {
        value: item._id,
        label: item.name,
        isLeaf: false
      }
    })
    this.setState({
      options
    })
  }
  _getCategory = async (parentId) => {
    const result = await getCategory(parentId)
    if (result.status === 0) {
      const categories = result.data
      if (parentId === '0') {
        this.initOptions(categories)
      } else {
        return categories
      }
    }
  }
  loadData = async (selectedOptions) => {
    // console.log(selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const subCategory = await this._getCategory(targetOption.value)
    targetOption.loading = false
    if (subCategory && subCategory.length > 0) {
      const childrenOptions = subCategory.map((item) => {
        return {
          label: item.name,
          value: item._id,
          isLeaf: true
        }
      })
      targetOption.children = childrenOptions
    } else { //当前选中的分类没有二级分类
      targetOption.isLeaf = true
    }
    this.setState({
      options: [...this.state.options],
    });

    // load options lazily
    // setTimeout(() => {
    //   targetOption.loading = false;
    //   targetOption.children = [
    //     {
    //       label: `${targetOption.label} Dynamic 1`,
    //       value: 'dynamic1',
    //     },
    //     {
    //       label: `${targetOption.label} Dynamic 2`,
    //       value: 'dynamic2',
    //     },
    //   ];
    //   debugger
    // }, 1000);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // console.log(this.editor.current.getDetail())
        // console.log(this.pw.current.getImgs())
        const { name, desc, price, categoryIds } = values
        let categoryId, pCategoryId
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()
        const goods = { name, desc, price, imgs, detail, pCategoryId, categoryId }
        if(this.isUpdate) {
         goods._id = this.product._id
        }
        const result = await reqAddOrUpdate(goods)
        if (result.status === 0) {
          message.success(`${this.isUpdate ? '更新':'添加'}商品成功!`)
          this.props.history.goBack()
        } else {
          message.success(`${this.isUpdate ? '更新':'添加'}商品失败!`)
        }
      }
    });
  };
  validatorPrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback()
    } else {
      callback('价格必须大于0')
    }
  }
  //1,getFieldDecorator 用于和表单进行双向绑定
  //2 getFieldsError 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error
  //3 getFieldError 获取某个输入控件的 Error
  //4 isFieldTouched 判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 
  // options.trigger
  //5.validateStatus  校验状态，如不设置，则会根据校验规则自动生成，
  // 可选：'success' 'warning' 'error' 'validating'
  //6 help 提示信息，如不设置，则会根据校验规则自动生成
  render() {

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 2 },  // 左侧label的宽度
      wrapperCol: { span: 8 }, // 右侧包裹的宽度
    }
    const { product, isUpdate } = this
    const { name, desc, price, detail, imgs, categoryId, pCategoryId } = product
    const { getFieldDecorator } = this.props.form
    const categoryIds = []
    if (isUpdate) {
      //如果商品是一个一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }
    }
    const title = (
      <span>
        <LinkButton onClick={() => {this.props.history.goBack()}}>
           <Icon type="arrow-left" />
        </LinkButton>
      <span>{isUpdate?'修改商品':'添加商品'}</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{ required: true, message: '必须输入商品名称' }],
            })(
              <Input
                placeholder="请输入商品名称"
              />,
            )}
          </Form.Item>
          <Form.Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue:desc,
                rules: [
                  { required: true, message: '必须输入商品描述' }
                ]
              })(<TextArea rows={4} placeholder="请输入商品描述" />)
            }

          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              initialValue:price,
              rules: [{ required: true, message: '必须输入商品价格' }, {
                validator: this.validatorPrice
              }],
            })(
              <Input
                type='number'
                placeholder='请输入商品价格'
                addonAfter='元'
              />
            )}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryIds', {
              initialValue: categoryIds,
              rules: [{ required: true, message: '必须指定商品分类' }],
            })(
              <Cascader
                options={this.state.options}
                loadData={this.loadData}
              />
            )}
          </Form.Item>
          <Form.Item label="商品图片">
            <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
          </Form.Item>
          <Form.Item label="商品详情" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.editor} detail={detail}></RichTextEditor>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(AddUpdate);