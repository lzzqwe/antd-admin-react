import React, { Component } from 'react';
import { Card,List,Icon } from 'antd';
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api'
const BASE_IMG_URL = 'http://localhost:5000/upload/'
class ProductDetail extends Component {
  state = {
    cName1:'',//一级分类名称
    cName2:''// 二级分类名称
  }
  async componentDidMount() {
    console.log(this.props.location.state.record)
    const {pCategoryId,categoryId} = this.props.location.state.record
    if(pCategoryId === '0') {
      // 获取一级分类下的商品  根据id获取分类的名称
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })
    } else {
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      // console.log(results)
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({
        cName1,
        cName2
      })
    } 
  }

  render() {
    const {name,desc,price,detail,imgs} = this.props.location.state.record
    const {cName1,cName2} = this.state
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
        <Icon type="arrow-left"/>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title}>
        <List>
          <List.Item>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>商品名称:</span>{name}
          </List.Item>
          <List.Item>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>商品描述:</span>{desc}
          </List.Item>
          <List.Item>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>商品价格:</span>{price}￥
          </List.Item>
          <List.Item style={{justifyContent:'flex-start'}}>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>所属分类:</span>
            <span>{cName1}{cName2?'-->'+cName2:''}</span>
          </List.Item>
          <List.Item style={{justifyContent:'flex-start'}}>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>商品图片:</span>
           <span>{imgs.map((item) => {
             return (
               <img alt='s' key={item} src={BASE_IMG_URL+item} style={{width:100,height:100}}></img>  
             )
           })}</span>
          </List.Item>
          <List.Item style={{justifyContent:'flex-start'}}>
            <span style={{marginRight:10,fontWeight:600,fontSize:20}}>商品详情:</span><span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
          </List.Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;