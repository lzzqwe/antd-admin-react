import jsonp from 'jsonp'
import ajax from './aiax'
import {message} from 'antd'
const BASE = ''

//1.获取一级或某个二级分类列表
export const getCategory = (parentId) => {
  return ajax(BASE + '/manage/category/list', { parentId })
}
//2.添加分类
export const addCategory = (parentId, categoryName) => {
  return ajax(BASE + '/manage/category/add', {
    parentId, categoryName
  }, 'POST')
}
//3.更新品类名称
export const updateCategory = (categoryId, categoryName) => {
  return ajax(BASE + '/manage/category/update', {
    categoryId, categoryName
  },'POST')
}
//4.根据分类ID获取分类
export const reqCategory = (categoryId) => {
  return ajax(BASE + '/manage/category/info',{categoryId})
}
//5.获取商品分页列表
export const reqProducts = (pageNum,pageSize) => {
  return ajax(BASE + '/manage/product/list',{
    pageNum,pageSize
  })
}
//6.根据ID/Name搜索产品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => {
  return ajax(BASE + '/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
}
// //7.添加商品
// export const addGoods = (goods) => {
//   return ajax(BASE + '/manage/product/add',goods,'POST')
// }
// //8.更新商品
// export const updateGoods = (goods) => {
//   return ajax(BASE + '/manage/product/update',goods,'POST')
// }
export const reqAddOrUpdate = (goods) => {
  return ajax(BASE +'/manage/product/'+(goods._id ? 'update':'add'),goods,'POST')
}
//9.对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status) => {
  return ajax(BASE +'/manage/product/updateStatus',{productId,status},'POST')
}
//10.获取角色列表
export const reqRoleList = () => {
  return ajax(BASE + '/manage/role/list')
}
//11.获取所有用户列表
export const reqAllUsers = () => {
  return ajax(BASE + '/manage/user/list')
}
//12.添加用户
export const reqAddUser = (user) => {
  return ajax(BASE + '/manage/user/add',user,'POST')
}
//13.更新用户
export const reqUpdateUser = (user) => {
  return ajax(BASE + '/manage/user/update',user,'POST')
}
//14.删除用户
export const reqDeleteUser = (userId) => {
  return ajax(BASE + '/manage/user/delete',{userId},'POST')
}
//15.添加角色
export const reqAddRole = (roleName) => {
  return ajax(BASE + '/manage/role/add',{roleName},'POST')
}
//16.更新角色(给角色设置权限)
export const reqUpdateRole = (auth) => {
  return ajax(BASE + '/manage/role/update',auth,'POST')
}
//17.上传图片
export const reqUploadImage =(image) => {
  return ajax(BASE + '/manage/img/upload',image,'POST')
}
//18.删除图片
export const reqDeleteImage = (name) => {
  return ajax(BASE + '/manage/img/delete',{name},'POST')
}
//19.登录
export const reqLogin = (username,password) => {
  return ajax(BASE + '/login',{username,password},'POST')
}
//20 获取天气信息
export const reqWeather =(city) => {
  return new Promise((resolve) => {
      const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      //发送jsonp请求
      jsonp(url,{},(err,data) => {
         console.log(data)
         if(!err && data.status==='success') {
           const {dayPictureUrl,weather,temperature} = data.results[0].weather_data[0]
           resolve({dayPictureUrl,weather,temperature})
         }else {
           message.error("获取天气失败了")
         }
      })
  })
}