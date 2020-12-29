import config from '@/config'
import HttpRequest from '@/libs/axios'

const publicPath = process.env.NODE_ENV === 'development' ? config.publicPath.dev : config.publicPath.pro
const axios = new HttpRequest(publicPath)

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


