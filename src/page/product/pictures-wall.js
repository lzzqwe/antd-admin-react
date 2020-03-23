import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal,message } from 'antd';

import {reqDeleteImage} from '../../api'
const BASE_IMG_URL = 'http://localhost:5000/upload/'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {
  static propTypes = {
    imgs:PropTypes.array
  }
  constructor(props) {
    super(props)
    let fileList = []
    const {imgs} = this.props
    if(imgs && imgs.length > 0) {
       fileList = imgs.map((item,index) => {
         return {
          uid: -index, // 每个file都有自己唯一的id
          name: item, // 图片文件名
          status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
          url: BASE_IMG_URL + item
         }
       })
    }
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  getImgs = () => {
    return this.state.fileList.map((file => {
      return file.name
    }))
  }

  handleChange = async ({ file, fileList }) => {
    // console.log(file)
    // console.log(fileList)
    // debugger
    if (file.status === 'done') {
      // debugger
      const result = file.response
      if (result.status === 0) {
        message.success("上传图片成功")
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    } else if(file.status === 'removed') {
       const result = await reqDeleteImage(file.name)
      //  console.log(result)
       if(result.status === 0) {
         message.success('删除图片成功')
       } else {
         message.error('删除图片失败')
       }
    }
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"//图片上传接口
          listType="picture-card"//卡片样式
          name='image'//请求参数名
          accept='image/*'//接受上传的文件类型
          fileList={fileList}//所有已上传图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall
