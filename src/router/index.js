import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/main/Index.vue'



Vue.use(VueRouter)

// 点击同一个路由不报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return routerPush.call(this, location, onResolve, onReject);
  return routerPush.call(this, location).catch(error=> error)
};



const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // 错误页面
  {
    name: 'error401',
    path: '/401',
    component: () => import('@/views/error/401')
  },
  {
    name: 'NotMatch',
    path: '*',
    meta: {
      noHeader: true,
      noFooter: true,
    },
    component: () => import('@/views/error/404')
  },
  {
    path: '/arDistancEducation',
    name: 'ArDistancEducation',
    component: () => import('@/views/main/ArDistancEducation')
  },
  {
    path: '/skill',
    name: 'Skill',
    component: () => import('@/views/main/Skill')
  },
  {
    path: '/college',
    name: 'College',
    component: () => import('@/views/main/College')
  },
  {
    path: '/college2',
    name: 'College2',
    component: () => import('@/views/main/College2')
  },
  {
    path: '/mediaInformation',
    name: 'MediaInformation',
    component: () => import('@/views/main/MediaInformation')
  },
  {
    path: '/talentsTransport',
    name: 'TalentsTransport',
    component: () => import('@/views/main/TalentsTransport')
  },
  {
    path: '/mediaInformationDetail',
    name: 'MediaInformationDetail',
    component: () => import('@/views/detail/MediaInformationDetail')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/register')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login')
  },
  {
    path: '/forgotPass',
    name: 'ForgotPass',
    component: () => import('@/views/user/forgotPass')
  },




  // 个人中心
  // 学生
  {
    path: '/userSetting',
    name: 'UserSetting',
    component: () => import('@/views/center/student/userSetting')
  },
  {
    path: '/myCollection',
    name: 'MyCollection',
    component: () => import('@/views/center/student/myCollection')
  },
  {
    path: '/myDeliver',
    name: 'MyDeliver',
    component: () => import('@/views/center/student/myDeliver')
  },
  {
    path: '/myCourse',
    name: 'MyCourse',
    component: () => import('@/views/center/student/myCourse')
  },
  {
    path: '/myResult',
    name: 'MyResult',
    component: () => import('@/views/center/student/myResult')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
