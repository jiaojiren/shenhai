import Vue from 'vue'
import {
  webAuthUserInfo
  // serviceGetMessageCount
} from '@/services'
// import {
//   Message
// } from 'iview'

let cacheKey = 'cacheTo'
export const state = Vue.observable({
  backTop: false, // 有没下拉
  isLogin: false,
  searchText: '',
  // companySearch: '',
  // industrySearch: '',
  // reportSearch: '',
  // policySearch: '',
  // xiaoweiSearch: '',
  jurisdictionList: {
    standard: false,
    park: false,
    standAdmin: false,
    memberAdmin: false,
    privateStand: false,
    reportUpload: false
  },
  userInfo: {
    //auth: 0,
    //userAvatar: '', // 头像
    userNo: '', // 用户 id
    authNo: 1, // 管理员： 0
    name: '', // 用户名
    companyName: '', // 公司名称
    schoolName: '', //学校名称
    mobile: '', //电话
    type: null, //类型
  },
  messageCount: 0 // 未读消息数
})

export const mutation = {
  setLoadingTrue() {
    state.isLoading = true
  },
  setLoadingFalse() {
    state.isLoading = false
  },
  // 登录
  login() {
    webAuthUserInfo()
      .then(res => {
        if (res.isSuccess) {
          // console.log(res.data)
          updateLoginStatus(res.data)
          // this.fetchMessageCount()
          
        } else {
          Message.info({
            content: res.msg,
            duration: 3
          });
        }
      })
    // updateLoginStatus(data)
    // this.fetchMessageCount()
  },
  // 退出登录
  logout() {
    sessionStorage.clear();
    state.isLogin = false
    state.jurisdictionList = {
        standard: false,
        park: false,
        standAdmin: false,
        memberAdmin: false,
        privateStand: false,
        reportUpload: false
      },
      state.searchText = ''
    state.userInfo = {
      // userAvatar: defaultAvatar,     // 头像
      auth: 0,
      userAvatar: '', // 头像
      userNo: '', // 用户 id
      authNo: 1, // 管理员
      userNickName: '' // 用户名
    }
  },
  // 检查是否已登录
  async checkLogin() {
    let res = await webAuthUserInfo()
      
    if (res.isSuccess) {
      // console.log(res.data)
      updateLoginStatus(res.data)
      return true
    } else {
      this.logout()
    }
    
  },
  // 获取未读消息数
  fetchMessageCount() {
    // serviceGetMessageCount()
    //   .then(res => {
    //     if (res.success) {
    //       state.messageCount = res.data;
    //     }
    //   });
  }
}
// 更新登录状态
function updateLoginStatus(data) {
  state.userInfo.name = data.name
  state.userInfo.userNo = data.id
  state.userInfo.authNo = data.authNo
  sessionStorage.setItem("key", data.id);
  state.userInfo.type = data.type
  state.userInfo.schoolName = data.schoolName
  state.userInfo.companyName = data.companyName
  state.userInfo.mobile = data.mobile
  state.isLogin = true

  // let o = {}
  // for (var i in data.codeList) {
  //   o[data.codeList[i]] = true
  // }
  // state.jurisdictionList = o
  // console.log(state.jurisdictionList)
}