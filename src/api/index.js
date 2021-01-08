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
//合作详情
export const corDetail = (data) => {
  return axios.request({
    url: '/privateCenter/corDetail',
    method: 'post',
    data
  })
}
//获取设备列表
export const getMachineList = (data) => {
  return axios.request({
    url: '/privateCourse/getMachineList',
    method: 'post',
    data
  })
}
//获取设备系列
export const getMachineSeries = () => {
  return axios.request({
    url: '/privateCourse/getMachineSeries',
    method: 'post',
  })
}
//上传设备信息
export const saveMachine = (data) => {
  return axios.request({
    url: '/privateCourse/saveMachine',
    method: 'post',
    data
  })
}
//获取企业列表
export const getCompanyList = (data) => {
  return axios.request({
    url: '/privateCenter/getCompanyList',
    method: 'post',
    data
  })
}
//设备课程列表
export const pageListCourse = (data) => {
  return axios.request({
    url: '/privateCourse/pageListPri',
    method: 'post',
    data
  })
}
// 获取合作企业列表-上传设备信息用
export const getCompanyCorList = (data) => {
  return axios.request({
    url: '/privateCenter/getCompanyCorList',
    method: 'post',
    data
  })
}
// 企业-删除课程
export const removeCoursePri = (data) => {
  return axios.request({
    url: '/privateCourse/removeCoursePri',
    method: 'post',
    data
  })
}



// -----------个人中心结束-------------------

// ---------------后台管理开始----------------
// ----后台-企业-开始-----
//合作列表
export const consolCorPageList = (data) => {
  return axios.request({
    url: '/consolCompanyCor/corPageList',
    method: 'post',
    data
  })
}

//删除合作记录
export const consolCorDeleteByPk = (data) => {
  return axios.request({
    url: '/consolCompanyCor/corDeleteByPk',
    method: 'post',
    data
  })
}

//企业-获取行业列表
export const corGetCompIndustryList = () => {
  return axios.request({
    url: '/consolCompanyCor/corGetCompIndustryList',
    method: 'post',
  })
}

//设备课程管理列表
export const pageListConCourse = (data) => {
  return axios.request({
    url: '/consuleCouse/PageListConComp',
    method: 'post',
    data
  })
}

//上传设备信息
export const saveConMachine = (data) => {
  return axios.request({
    url: '/consuleCouse/saveMachine',
    method: 'post',
    data
  })
}
//设备课程上下架
export const changeCourseConComp = (data) => {
  return axios.request({
    url: '/consuleCouse/changeCourseConComp',
    method: 'post',
    data
  })
}
// 企业-删除课程
export const removeCourseConComp = (data) => {
  return axios.request({
    url: '/consuleCouse/removeCourseConComp',
    method: 'post',
    data
  })
}
// 新增用户
export const saveCompanyMemberUser = (data) => {
  return axios.request({
    url: '/consoleAccount/saveCompanyMemberUser',
    method: 'post',
    data
  })
}
// 用户列表
export const companyMemberPageList = (data) => {
  return axios.request({
    url: '/consoleAccount/companyMemberPageList',
    method: 'post',
    data
  })
}
// 更换员工状态
export const companyMemeberStatus = (data) => {
  return axios.request({
    url: '/consoleAccount/companyMemeberStatus',
    method: 'post',
    data
  })
}
//权限列表
export const getPermissionList = () => {
  return axios.request({
    url: '/consoleAccount/getPermissionList',
    method: 'post',
  })
}




// ----后台-企业-结束-----



// ----后台-学校-开始-----
//学校-设备课程管理列表，参数（{
export const listConCourseSch = (data) => {
  return axios.request({
    url: '/consuleCouse/pageListConSchool',
    method: 'post',
    data
  })
}
//学校-上传课程，
export const saveCourse = (data) => {
  return axios.request({
    url: '/privateCourse/saveCourse',
    method: 'post',
    data
  })
}
//设备课程上下架
export const changeCourseConSchool = (data) => {
  return axios.request({
    url: '/consuleCouse/changeCourseConSchool',
    method: 'post',
    data
  })
}
//学校-删除课程
export const removeCourseConSchool = (data) => {
  return axios.request({
    url: '/consuleCouse/removeCourseConSchool',
    method: 'post',
    data
  })
}
// 考试列表
export const pageListConExam = (data) => {
  return axios.request({
    url: '/consoleExam/pageList',
    method: 'post',
    data
  })
}
//上下架考试
export const changeConSchExamStatus = (data) => {
  return axios.request({
    url: '/consoleExam/changeStatus',
    method: 'post',
    data
  })
}
//新建/更新专家
export const saveSchoolMemberUser = (data) => {
  return axios.request({
    url: '/consoleAccount/saveSchoolMemberUser',
    method: 'post',
    data
  })
}
//专家列表
export const schoolMemberPageList = (data) => {
  return axios.request({
    url: '/consoleAccount/schoolMemberPageList',
    method: 'post',
    data
  })
}
// 删除学校专家
export const schoolMemeberDelete = (data) => {
  return axios.request({
    url: '/consoleAccount/schoolMemeberDelete',
    method: 'post',
    data
  })
}
//获取学校专家详情
export const schoolMemeberDetail = (data) => {
  return axios.request({
    url: '/consoleAccount/schoolMemeberDetail',
    method: 'post',
    data
  })
}






// ----后台-学校-结束-----



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


