import config from '@/config'
import HttpRequest from '@/libs/axios'

const publicPath = process.env.NODE_ENV === 'development' ? config.publicPath.dev : config.publicPath.pro
const axios = new HttpRequest(publicPath)

// 注册
export const register = (data) => {
  return axios.request({
    url: '/account/register',
    method: 'post',
    data
  })
}
// 登录
export const login = (data) => {
  return axios.request({
    url: '/account/login',
    method: 'post',
    data
  })
}
// 验证登录
export const webAuthUserInfo = () => {
  return axios.request({
    url: '/account/getAccountInfo',
    method: 'post',
  })
}
// 退出登录
export const logout = () => {
  return axios.request({
    url: '/account/logout',
    method: 'post',
  })
}

// -----------个人中心开始-------------
//获取企业/学校信息
export const getCenterInfo = () => {
  return axios.request({
    url: 'privateCenter/getCompanyInfo',
    method: 'post'
  })
}
// 更新账号基本信息
export const modifyAccountBaseData = (data) => {
  return axios.request({
    url: 'privateCenter/modifyAccountBaseData',
    method: 'post',
    data
  })
}
// 换绑手机号码
export const modifyPhone = (data) => {
  return axios.request({
    url: 'privateCenter/modifyPhone',
    method: 'post',
    data
  })
}
// 重置密码
export const modifyPassword = (data) => {
  return axios.request({
    url: 'privateCenter/modifyPassword',
    method: 'post',
    data
  })
}
//根据企业名称或统一社会信用代码查找企业
export const checkCompanyExist = (data) => {
  return axios.request({
    url: 'privateCenter/checkCompanyExist',
    method: 'post',
    data
  })
}
// 添加合作企业
export const addCompanyCor = (data) => {
  return axios.request({
    url: 'privateCenter/addCompanyCor',
    method: 'post',
    data
  })
}
// 合作企业列表
export const corPageList = (data) => {
  return axios.request({
    url: '/privateCenter/corPageList',
    method: 'post',
    data
  })
}
//删除合作记录
export const corDeleteByPk = (data) => {
  return axios.request({
    url: '/privateCenter/corDeleteByPk',
    method: 'post',
    data
  })
}
//编辑备注
export const modifyRemark = (data) => {
  return axios.request({
    url: '/privateCenter/modifyRemark',
    method: 'post',
    data
  })
}
// -----------个人中心结束-------------------

// ---------------后台管理开始----------------
//合作列表
export const consolCorPageList = (data) => {
  return axios.request({
    url: '/consolCompanyCor/corPageList',
    method: 'post',
    data
  })
}



// ------------------后台管理结束-----------------

// -----------媒体与资讯-----------
//获取筛选目录
export const getMediaInfoType = () => {
  return axios.request({
    url: 'article/getAllArticleCategory',
    method: 'post'
  })
}

//根据目录ID查找新闻列表，0为全部，
export const getNewsList = (data) => {
  return axios.request({
    url: 'article/getArticleListPageByCategoryId',
    method: 'post',
    data
  })
}

//根据主键查找详情
export const getNewsDetail = (data) => {
  return axios.request({
    url: '/article/getArticleListByPk',
    method: 'post',
    data
  })
}

//获取列表右方的活动推荐和考试资讯
export const getRightInfo = () => {
  return axios.request({
    url: '/article/getRightSide',
    method: 'post'
  })
}


