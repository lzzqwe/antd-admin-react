import store from 'store'
const USER_KEY = 'user_key'
export default {
  //保存
  saveUser(user) {
    store.set(USER_KEY,user)
  },
  //读取
  getUser() {
    return store.get(USER_KEY) || {}
  },
  //删除
  deleteUser() {
    store.remove(USER_KEY)
  }
 }