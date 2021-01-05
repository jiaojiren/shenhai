import Vue from 'vue'
import {
  webAuthUserInfo
} from '@/api'


export const state = Vue.observable({
  isLogin: false,
  searchText: '',
  userInfo: {
    pk_Account: null, // 用户 id
    UserName: null, // 用户名
    Name: null, // 真实名称
    TypeID1: null, // 用户类型1
    TypeID2: null, // 用户类型2
    StatusID: null, // 
    Phone: null, //电话
    Email: null //邮箱
  },
  messageCount: 0 // 未读消息数
})

export const mutation = {

  // 退出登录
  logout() {
    state.isLogin = false
    state.searchText = ''
    state.userInfo = {
      pk_Account: null, // 用户 id
      UserName: null, // 用户名
      Name: null, // 真实名称
      TypeID1: null, // 用户类型1
      TypeID2: null, // 用户类型2
      StatusID: null, // 
      Phone: null, //电话
      Email: null //邮箱
    }
  },
  // 检查是否已登录
  async checkLogin() {
    let res = await webAuthUserInfo()

    if (res.ercode == 0) {
      updateLoginStatus(res.data)
      return true
    } else {
      this.logout()
    }

  },
}
// 更新登录状态
function updateLoginStatus(data) {
  state.userInfo.pk_Account = data.pk_Account
  state.userInfo.TypeID1 = data.TypeID1
  state.userInfo.TypeID2 = data.TypeID2
  state.userInfo.StatusID = data.StatusID
  state.userInfo.Phone = data.Phone
  state.userInfo.Email = data.Email
  state.userInfo.UserName = data.UserName
  state.userInfo.Name = data.Name
  state.isLogin = true
}
// 获取cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    console.log('jj')
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      // 判断这个cookie的参数名是不是我们想要的
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}